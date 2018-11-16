let basUrl = "/quantdo";
export default {
    basUrl: basUrl,
    "namespace":{
       findAll: basUrl + "/service",       //查询所有接口
       findByQuery: basUrl + "/service",   //条件查询接口
       update: basUrl + "/service",        //更新、修改接口
       delete: basUrl + "/service",        //删除接口
       add: basUrl + "/service",           //添加接口
    },
}