import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import {Message} from "iview";
import MessageUtils from "../../common/MessageUtils";

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "WorkerStore",
    store,
})
export default class WorkerStore extends VuexModule {
    public checkeds: Array<any>;

    public peoples: any;
    public pageIndex: number;
    public pageSize: number;
    public pageTotal:number;
    public inPageIndex: number;
    public inPageSize: number;
    public inPageTotal:number;

    public userName:string;
    public card:string;
    public phone:number;
    public type:string;
    public project:string;
    public projectId:string;
    public unit:string;
    public unitId:number;
    public animal:string;
    public startTime:Date;
    public endTime:Date;
    public photo:string;
    public idCardfront:string;
    public idCardReverse:string;
    public certificate:string;
    public grade:string;
    public archivesId:number;


    public selectProjectName:string;
    public selectContractors:string;
    public selectUserName:string;
    public selectType:string;
    public selectStatus:number;


    public infoId:number;
    public infoIdNumber:number;
    public involvedProjectInfo:Array<InvolvedProjectInfo>;
    public peopleInfo:PeopleInfo;
    public salaryInfo:any;
    public commentInfo:any;
    public projectList:Array<ProjectList>;
    public cultivateList:any;
    public projectType: Array<ProjectType>;
    public unitList:Array<UnitList>;

    public check : Array<any>;
    public checkWorkceMonth : any;
    public checkWorkce : number;
    public onLeave:number;
    public conditionList:Array<any>;

    constructor(e) {
        super(e)
        this.pageIndex=1;
        this.pageSize= 10;
        this.pageTotal = 0;

        this.inPageIndex=1;
        this.inPageSize= 1;
        this.inPageTotal = 0;
        this.check = [];
        this.onLeave = null;


        this.peoples = [];
        this.projectType = [];
        this.conditionList = [];
        this.cultivateList = [];
        this.salaryInfo = {};
        this.commentInfo = {};
        this.card = "";
        this.phone = null;
        this.type = null;
        this.userName = "";
        this.animal = "2";
        this.infoId=null;
        this.infoIdNumber=null;
        this.projectId = "";
        this.unitId = null;
        this.unit = null;
        this.project = "";
        this.archivesId = null;

        this.checkeds = new Array();

        this.startTime = null;
        this.endTime = null;
        this.photo = "";
        this.idCardfront="";
        this.idCardReverse="";
        this.certificate="";
        this.grade = "";

        this.involvedProjectInfo = [];
        this.peopleInfo={};
        this.checkWorkceMonth={};
        this.checkWorkce=null;
        this.projectList=[];
        this.unitList = [];
        this.selectProjectName="";
        this.selectContractors="";
        this.selectUserName="";
        this.selectType="";
        this.selectStatus=null;
    }
    @Action
    public getParams() : any {
        if(this.selectProjectName){
            let item ={};
            item["name"]="project_name";
            item["value"]=this.selectProjectName;
            item["algorithm"] = "LIKE"
            this.conditionList.push(item);
        }
        if(this.selectContractors){
            let item ={};
            item["name"]="unit_name";
            item["value"]=this.selectContractors;
            item["algorithm"] = "LIKE"
            this.conditionList.push(item);
        }
        if(this.selectUserName){
            let item ={};
            item["name"]="eafName";
            item["value"]=this.selectUserName;
            item["algorithm"] = "LIKE"
            this.conditionList.push(item);
        }
        if(this.selectType){
            let item ={};
            item["name"]="workType";
            item["value"]=this.selectType;
            item["algorithm"] = "EQ"
            this.conditionList.push(item);
        }
        if(this.selectStatus != undefined && this.selectStatus > -1
            && this.selectStatus != null){
            let item ={};
            item["name"]="leave";
            item["value"]=this.selectStatus;
            item["algorithm"] = "EQ"
            this.conditionList.push(item);
        }
        return {

            "pageInfo" : {
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize
            },

            "conditionList": this.conditionList,

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": []
        };
        // params.conditionList[0].value = new Array();
    }
    @Action
    public getUpdateParams() : any {
        return  {
            "data": {
                "leave": this.onLeave
            },
            "conditionList": [{
                "name": "id",
                "value":  this.check,
                "algorithm": "IN"
            }
            ],

            "keywords" : []
        };
    }
    @Action
    public getUploadParams() : any {

        return {
            "conditionList": [{
                "name": "a.eafId",
                "value":  this.check,
                "algorithm": "IN"
            }],


            "keywords" : [],
            "selectList": [
                {"field": "eafName","alias":"姓名" },
                {"field": "eafPhone" ,"alias":"手机"},
                {"field": "cwrIdnum","alias":"身份证" },
                {"field": "workType","alias":"工种" }
            ]
        };
    }
    @Action
    public getInParams() : any {
        return {
            "joinTables": [
                {
                    "tablename": "involvedproject",
                    "alias": "a",
                    "JoinMode": "Left",
                },
                {
                    "tablename": "archives",
                    "alias": "v",
                    "JoinMode": "Left",
                    "onList": [{
                        "name": "v.project_id",
                        "value": "a.project_id",
                        "algorithm": "EQ"
                    }]
                },
                {
                "tablename": "project",
                "alias": "p",
                "JoinMode": "Left",
                "onList": [{
                    "name": "p.project_id",
                    "value": "a.project_id",
                    "algorithm": "EQ"
                }]
            }, {
                "tablename": "unit",
                "alias": "u",
                "joinMode": "Left",
                "onList": [{
                    "name": "u.unit_id",
                    "value": "a.unit_id",
                    "algorithm": "EQ"
                }]
            }
            ],
            "pageInfo" : {
                "pageIndex": this.inPageIndex,
                "pageSize": this.inPageSize
            },

            "conditionList": [{
                "name": "a.archives_id",
                "value": this.infoId,
                "algorithm": "EQ"
            }
            ],

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": [
                {"field": "a.id"},
                {"field": "a.project_id"},
                {"field": "a.archives_id"},
                {"field": "a.unit_id"},
                {"field": "a.start_time"},
                {"field": "a.end_time"},
                {"field": "p.project_name"},
                {"field": "u.unit_name"},
                {"field": "v.work_type"},
                {"field": "v.leave"}

            ]

        }
    }
    @Action
    public async update() {
        await request.post('/api/workerlib/archives/update',await this.getUpdateParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successUpdate(data);
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！');
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async upload() {
        let alert: any = Message;
        await request.post('/api/workerlib/people/export',await this.getUploadParams(),{responseType: 'blob', params: '人员档案'}).then((data)=>{
            if(!data){
                return;
            }
            this.successUpload();
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！');
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async synchronization() {
        let alert: any = Message;
        await request.post('/alluser/SynAlluser').then((data)=>{
            if(!data){
                return;
            }
            this.sucessSynchronization(data);
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！');
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async search() {
        await request.post('/api/workerlib/people',await this.getParams()).then((data)=>{
            if(!data) {
                return;
            }
            this.success(data);
            this.count();
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！')
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async searchInfo() {
        await request.post('/api/workerlib/alluser',{
            "pageInfo" : {},

            "conditionList": [{
                "name": "eafId",
                "value": this.infoId,
                "algorithm": "EQ"
            }
            ],

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": []

        }).then((data)=>{
            if(!data){
                return;
            }
            this.successInfo(data);
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！')
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async selectComments() {
        await request.post('/api/workerlib/comments',{
            "pageInfo" : {},
            "conditionList": [{
                "name": "eafId",
                "value": this.infoId,
                "algorithm": "EQ"
            }
            ],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []

        }).then((data)=>{
            if(!data){
                return;
            }
            this.successCommentInfo(data);
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！')
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async selectSalary() {
        await request.post('/api/workerlib/salary',{
            "pageInfo" : {},
            "conditionList": [{
                "name": "id_number",
                "value": this.infoIdNumber,
                "algorithm": "EQ"
            }],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": [
                { //显示字段
                    "field": "pay",  //字段名
                    "alias":"pay",
                    "function": "SUM"
                },
                { //显示字段
                    "field": "income",  //字段名
                    "alias":"income",
                    "function": "SUM"
                }
            ]

        }).then((data)=>{
            if(!data){
                return;
            }
            this.successSalaryInfo(data);
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！')
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async searchInvolvedProject() {
        await request.post('/api/workerlib/join',await this.getInParams()).then((data)=>{
            if(!data){
                return;
            }
            this.successInvolvedProject(data);
            this.countIn();
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！')
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async selectProject() {
        await request.post('/api/workerlib/project',{
            "pageInfo" : {},

            "conditionList": [],

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": []

        }).then((data)=>{
            if(!data){
                return;
            }
            this.successProjectList(data);
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！')
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    //参与培训
    @Action
    public async  selectCultivate(){
        await request.post('/api/workerlib/join',{
            "joinTables": [
                {
                    "tablename": "cultivate_archives",
                    "alias": "a",
                    "JoinMode": "Left",
                },
                {
                    "tablename": "cultivate",
                    "alias": "c",
                    "JoinMode": "Left",
                    "onList": [{
                        "name": "a.cultivate_id",
                        "value": "c.id",
                        "algorithm": "EQ"
                    }]
                }
            ],
            "pageInfo" : {},
            "conditionList": [{
                "name": "archives_id",
                "value": this.infoId,
                "algorithm": "EQ"
            } ],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": [
                {
                    "field":"course_name"
                },
                {
                    "field":"status"
                },
                {
                    "field":"training_time"
                },
                {
                    "field":"archivesStatus"
                },
                {
                    "field": "c.startTime",  //字段名
                    "alias":"startTime"
                },
                {
                    "field": "a.endTime",  //字段名
                    "alias":"endTime"
                }
            ]
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successCultivate(data);
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！')
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });

    }
    @Action
    public async count() {
        await request.post('/api/workerlib/people/count', await this.getParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async countIn() {
        await request.post('/api/workerlib/join/count', await this.getInParams()).then((total)=>{
            if(!total){
                return;
            }
            this.setInPageTotal(total.data)
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async getProjectType(){
        await request.post('/api/workerlib/dictionaries', {
            "pageInfo" : {},
            "conditionList": [{
                "name": "category",
                "value": "工种",
                "algorithm": "EQ"
            }],
            "sortList": [],

            "groupList" : [],

            "keywords" : [],
            "selectList": []
        }).then((data)=>{
            if(!data){
                return;
            }
            this.successType(data);
        }).catch((e)=>{
            MessageUtils.warning(e);
        });
    }
    @Action
    public async selectUnit() {
        await request.post('/api/workerlib/unit',{
            "pageInfo" : {},

            "conditionList": [{
                "name": "project_id",
                "value": this.projectId,
                "algorithm": "EQ",
            }, ],

            "sortList": [ ],

            "groupList" : [
            ],

            "keywords" : [],

            "selectList": []

        }).then((data)=>{
            this.successUnitList(data);
        }).catch((e)=>{
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！')
                return
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async insertArchives() {
        await request.put('/api/workerlib/alluser', {
            "eafName":this.userName,
            "eafPhone":this.phone,
            "cwrIdnum":this.card,
            "cwrPhoto":this.photo,
            "workType":this.type,
            "id_card_front":this.idCardfront,
            "id_card_reverse":this.idCardReverse,
            "certificate":this.certificate,
            "unit_id":"E1518A607E764390848F188390482597"
        }).then((data)=>{
            if(!data){
                return;
            }
            this.added(data)
        }).catch((e)=>{
            console.log(e)
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！');
                return;
            }

            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }

            if(!e.message) {
                return;
            }

            alert.warning(e.message || e)
        });
    }
    @Action
    public async selectCheckWorkceMonth() {
        await request.post('/api/workerlib/user_salary', {
            "pageInfo" : {},
            "conditionList": [{
                "name": "cwrUserid",
                "value": this.infoId,
                "algorithm": "EQ"
            },{
                "name": "month",
                "value": new Date().getMonth()+1,
                "algorithm": "EQ"
            }],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        }).then((data)=>{
            if(!data){
                return;
            }
            this.sucessCheckWorkceMonth(data)
        }).catch((e)=>{
            console.log(e)
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！');
                return;
            }
            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }
            if(!e.message) {
                return;
            }
            alert.warning(e.message || e)
        });
    }
    @Action
    public async selectCheckWorkce() {
        await request.post('/api/workerlib/checkworkce/count', {
            "pageInfo" : {},
            "conditionList": [{
                "name": "cwrUserid",
                "value": this.infoId,
                "algorithm": "EQ"
            }],
            "sortList": [],
            "groupList" : [],
            "keywords" : [],
            "selectList": []
        }).then((data)=>{
            if(!data){
                return;
            }
            this.sucessCheckWorkce(data)
        }).catch((e)=>{
            console.log(e)
            let alert: any = Message;
            if(!e) {
                alert.warning('未知错误！');
                return;
            }

            if(e.response && e.response.data && e.response.data.message) {
                alert.warning(e.response.data.message)
                return
            }

            if(!e.message) {
                return;
            }

            alert.warning(e.message || e)
        });
    }
    @Action
    public added(data: any) {
        if(data.status == 0) {
            this.search();
        }
    }
    @Action
    private sucessSynchronization(data: any) {
        if(data.status == 0){
            this.search();
            let alert: any = Message;
            alert.warning('成功！');
        }
    }
    @Action
    public successUpdate(data: any) {
        let alert: any = Message;
        if(data.status == 0) {
            this.clear();
            this.search();
            alert.warning("成功！");

        }
    }
    @Mutation
    private sucessCheckWorkceMonth(data: any) {
        this.checkWorkceMonth = data.data;
    }
    @Mutation
    private sucessCheckWorkce(data: any) {
        this.checkWorkce = data.data;
    }
    @Mutation
    private setCheck(data: any) {
        this.check = data;
    }
    @Mutation
    private successUpload() {
        this.check = [];
    }
    @Mutation
    private setOnLeave(data: number) {
        this.onLeave = data;
    }
    @Mutation
    private success(data: any) {
        this.peoples = data.data;
        if(!this.peoples) {
            return;
        }
    }
    @Mutation
    private successInvolvedProject(data: any) {
        this.involvedProjectInfo = data.data;
    }
    @Mutation
    private successInfo(data: any) {
        this.peopleInfo = data.data[0];
    }
    @Mutation
    private successCommentInfo(data: any) {
        this.commentInfo = data.data[0];
    }
    @Mutation
    private successSalaryInfo(data: any) {
        this.salaryInfo = data.data[0];
    }
    @Mutation
    private setChecked(data: any) {
        this.checkeds.push(data);
    }
    @Mutation
    private clear() {
        this.checkeds.length = 0;
    }
    @Mutation
    private successProjectList(data: any) {
        this.projectList = data.data;
    }
    @Mutation
    private successCultivate(data: any) {
        this.cultivateList = data.data;
    }
    @Mutation
    private successUnitList(data: any) {
        this.unitList = data.data;
    }
    @Mutation
    public setArchivesId(data: number) {
        this.archivesId = data;
    }
    @Mutation
    public setPhoto(data: string) {
        this.photo = data;
    }
    @Mutation
    public setIdCardfront(data: string) {
        this.idCardfront = data;
    }
    @Mutation
    public setIdCardReverse(data: string) {
        this.idCardReverse = data;
    }
    @Mutation
    public setCertificate(data: string) {
        this.certificate = data;
    }
    @Mutation
    public setGrade(data: string) {
        this.grade = data;
    }
    @Mutation
    public setStartTime(data: Date) {
        this.startTime = data;
    }
    @Mutation
    public setEndTime(data: Date) {
        this.endTime = data;
    }
    @Mutation
    public setInfoId(data: number) {
        this.infoId = data;
    }
    @Mutation
    public setInfoIdNumber(data: number) {
        this.infoIdNumber = data;
    }
    @Mutation
    public setSelectProjectName(data:string){
        this.selectProjectName = data;
    }
    @Mutation
    public setSelectContractors(data:string){
        this.selectContractors = data;
    }
    @Mutation
    public setSelectUserName(data:string){
        this.selectUserName = data;
    }
    @Mutation
    public setSelectType(data:string){
        this.selectType = data;
    }
    @Mutation
    public setSelectStatus(data:number){
        this.selectStatus = data;
    }
    @Mutation
    public successType(data: any) {
        this.projectType = data.data;
    }
    @Mutation
    public setUserName(data:string) {
        this.userName = data;
    }
    @Mutation
    public setCard(data:string){
        this.card = data;
    }
    @Mutation
    public setPhone(data:number){
        this.phone = data;
    }
    @Mutation
    public setType(data:any) {
        this.type = data.join();
    }
    @Mutation
    public setProject(data:string){
        this.project = data;
    }
    @Mutation
    public setUnit(data:string){
        this.unit = data;
    }
    @Mutation
    public setProjectId(data:string){
        this.projectId = data;
    }
    @Mutation
    public setUnitId(data:number){

        this.unitId = data;
    }
    @Mutation
    public setAnimal(data:string){
        this.animal = data;
    }
    @Mutation
    public setPageTotal(data: number) {
        this.conditionList = [];
        this.pageTotal = data;
    }
    @Mutation
    public setInPageTotal(data: number) {
        this.inPageTotal = data;
    }
    @Mutation
    public setPageSize(data: number) {
        this.pageSize = data;
    }
    @Mutation
    public setPageIndex(data: number) {
        this.pageIndex = data;
    }
    @Mutation
    public setInPageIndex(data: number) {
        this.inPageIndex = data;
    }
    @Mutation
    public setInPageSize(data: number) {
        this.inPageSize = data;
    }
}
interface ProjectType {
    value?: string;
    name?: string;
}
interface PeopleInfo {
    id?:number;
    name?:string;
    phone?:string;
    id_number?:string;
    work_type?:string;
    leave?:number;
    leader?:number;
    grade?:string;
}
interface ProjectList {
    id?:number;
    project_name?:string;
}
interface UnitList {
    id?:number;
    project_license?:string;
}
interface InvolvedProjectInfo {
    project_name?:string;
    start_time?:Date;
    end_time?:Date;
    project_license?:string;
}
