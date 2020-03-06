import { Storage } from 'aws-amplify';
import { useIndexedDB } from 'react-indexed-db';
import * as surveydata from './niti-ipsos-surveys.json';
import { API } from 'aws-amplify';

const FetchS3File = (name) =>
{
    const { add } = useIndexedDB('conf');

    Storage.get(name).catch(err => console.log(err)).then (result => {

        fetch(result).then((r) => r.text()).then(text  => {
            add({id:name, text: text}).then( result => {console.log(result)}, err => {console.log(err)} );
        })

    }, err => {
        console.log(err);
    })
    return null;
}

const SyncFile = (name) =>{
    const { getAll } = useIndexedDB('conf');
    getAll().then( confFiles => {
        if ( confFiles.length === 0 || confFiles.filter( conf => conf.id === name).length === 0 )
        {
          FetchS3File(name)
        }
    }, err => {
        console.log(err);
    })
}

const SyncAllConfFiles = () => {

    surveydata.surveys.map( (survey) => {
        return SyncFile(survey.yaml);
    });
}

const SyncSurvey = (survey, username) => {

  survey.questions.forEach((quest) => {
    if (quest.type === 'image') {
        const pic = survey.answers[quest.id];
        const type = pic.webPath.slice(pic.indexOf('.')+1);
        const s3url = survey.id+'/'+username+'_'+quest.id+'_'+(new Date().getTime()+'.'+type);
        Push2S3(s3url, type, pic);
        survey.answers[quest.id] = pic;
    }
  });

  API.post('api', '/survey/1', {body: survey})
  .then(response => {
      console.log(response.id);

  }).catch(error => {
      console.log(error.response)
  });

}

const SyncAllSurveys = (username) => {
  console.log(username)
  const { getAll } = useIndexedDB('surveys');
  getAll().then( surveysFromDB => {
        surveysFromDB.forEach((eachSurveyFromDB) => {
          SyncSurvey(eachSurveyFromDB, username);
        });
      }
    );
  return null;
}

const SaveLocale = (user, locale) => {
    const { update } = useIndexedDB('user');
    update({id:0, username: user.username, lang: locale}).then( event => {
          console.log(event);
        }, err => {
          console.log(err)
        })
}

const Push2S3 = (url, type, media) => {
    Storage.put(url, media, {
        contentType: 'image/'+type
    })
    .catch(err => console.log(err))
    .then (result => {
        this.setState({...this.state, open:false, loading: false });
    })
}

export { SyncFile, FetchS3File, SyncAllSurveys, SaveLocale, Push2S3, SyncAllConfFiles };