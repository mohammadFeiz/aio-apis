# aio-apis
``` javascript
const MyLoader:FC = ()=>{
    return ....
}
type I_apis_props = {
    id:string, //uniq id of app
    baseUrl:string, //base of any url 
    loader:()=>React.ReactNode,//custom loader
    apis:I_ApisDictionary,//define apis properties
    mock:I_mockInstance // define class mock by methods by same name in apis keys
    onCatch:(err:any,apiConfig:any)=>string,
    getError:(response:any,apiConfig:any)=>string | undefined
}
class Mock {
    Users_Get = (type) => {
        return [
            {name:'name1',id:0},
            {name:'name2',id:1},
            {name:'name3',id:2},
            {name:'name4',id:3},
            {name:'name5',id:4},
            {name:'name6',id:5}
        ]
    }
}
let props:I_apis_props = {
    id:'my app',
    baseUrl:'https://my-dev.com/ap/v1',
    //this is optional(default loader will work)
    //you can returns any jsx/html as loader 
    loader:()=><MyLoader/>,
    //this function will call after request went to catch
    //in this case you should return an string error message to user
    onCatch:(err,apiConfig)=>{
        if(err.response){
            return err.response.message
        }
        else if(err.message){
            return err.message
        }
        else {
            return 'unknown error'
        }
    },
    //check all apis and if is error conditions return error message else return undefined
    //you can check is token valid or not in this function . if not valid you can call logout
    getError:(response,apiConfig)=>{
        if(response.data.isSuccess === false){
            return response.data.message
        }
    },
    //define apis in dectionary
    apis:{
        Users_Get:{
            //read User_Get from Mock class instance
            mockResult:true
        },
        Users_Add:{
            //optional
            //error messages of popups will create from this description
            //for example 
            description:'adding user',
            //set api method
            method:'post',
            //set api url by baseUrl
            getUrl:(baseUrl)=>`${baseUrl}/Users/Add`,
            //this used just in method post. 
            //you can send a parameter to this function for create body
            getBody:(param)=>{
                let {image,name} = param;
                return {
                    Image:image,
                    Name:name
                }
            },
            //get result from request response
            //notice that returns string mean an error occured
            //for return an string that is not err you should set it in an object
            getResult:(response)=>{
                if(!response.data.id){return 'user add missing id!!!'}
                return {
                    id:response.data.id
                }
            },
            //if an error occured return this value as result
            errorResult:false,
            //show loader or not
            loading:true,
            //show loader in which place?
            loadingParent:'.my-table-container',
            message:{
                //show automatic error message
                error:true,//(defalut is true)
                //prevent show error message
                error:false,//(defalut is true)
                //show custom error message
                error:'there is an error',//(defalut is true)
                //show automatic success message
                success:true,
                //prevent show success message
                success:false,
                //dynamic success message
                success:({result,appState,parameter})=>`order by number = ${result.orderNumber} is added successfully`,
                //cache result of request if is successfull for 24 hours
                cache:{
                    name:'main_products',
                    time:24 * 60 * 60 * 1000
                }
            }
        }
    },
    mock:new Mock()
}
let apis = new AIOApis(props)

```