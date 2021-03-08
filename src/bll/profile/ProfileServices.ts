import {ProfileNetwork} from '@/network/profile/ProfileNetwork'
import {profile_result_model} from '@/model/profile/profile_result_model'

export class ProfileServices{
    public async dologin(params){
        let network = new ProfileNetwork()
        let startDateTime = new Date().getTime();
        const resultData:any = await network.dologin(params)
        let endDateTime = new Date().getTime();

        let data = new profile_result_model();
        data.code = resultData.code;
        data.data = resultData;
        data.message = resultData.message;
        data.expendTime = endDateTime - startDateTime;

        return data;
    }

}