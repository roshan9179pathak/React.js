import conf from "../conf/conf";
import {Client , Account , ID} from 'appwrite'

export class AuthService {

        client = new Client();
        account;

      constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
      } 
      
   async createAccount ({email , password, name
   }){

    try {
        const userAccount = await this.account.create(ID.unique , email , password , name);

    if(userAccount){
        return this.login({email,password})
    }
    else{
        alert('Please Create Account First')
        return userAccount;
    }

    } catch (error) {
        throw error
    }

   }
   
   async login ({email , password}){
        try {
        return await this.account.createEmailPasswordSession(email , password)
        } catch (error) {
            throw error
        }
   }

   async currentUser (){
    try {
        return await this.account.get()
    } catch (error) {
        // console.log('Handle error :: getCurrentUser :: error', error);
        return null
    }

    return null
   }

   async logOut(){
    try {
    await this.account.deleteSessions()
    } catch (error) {
        throw error
    }

    return null
   }

}

const authservice = new AuthService();

export default authservice;
