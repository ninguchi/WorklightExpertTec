/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/************************************************************************
 * Implementation code for procedure - 'procedure1'
 *
 *
 * @return - invocationResult
 */
var loginProfileStatement = WL.Server.createSQLStatement("select PRO_ID, PRO_NAME, PRO_FNAME, PRO_LNAME, PRO_WORKUNIT from PROFILE where PRO_USERNAME = ? and PRO_PASSWORD = ?");
//var getWorkOrderByWorkUnitStatement =  WL.Server.createSQLStatement("select * from WORK_ORDER where WOO_WORKUNIT = ?");
var getWorkOrderByWorkUnitStatement =  WL.Server.createSQLStatement("select WOO_ID, WOO_WORKUNIT, WOO_STATUS_EN, WOO_PRODUCT_TYPE1, WOO_PRODUCT_TYPE2,WOO_ORDER_NO, WOO_LATITUDE, WOO_LONGITUDE from WORK_ORDER where WOO_WORKUNIT = ? order by WOO_SEQUENCE");
var insertWorkOrderNewWorkUnitStatement = WL.Server.createSQLStatement("insert into WORK_ORDER (WOO_WORKUNIT, WOO_SEQUENCE, WOO_WOS_ID, WOO_PRODUCT_TYPE1, WOO_PRODUCT_TYPE2, WOO_ORDER_NO, WOO_GIS, WOO_LATITUDE, WOO_LONGITUDE) values (?,?,?,?,?,?,?,?,?) ");
var getWorkDetailStatement =  WL.Server.createSQLStatement("select * from WORK_ORDER where WOO_ID = ?"); 
//var getWorkOrderStatusStatement = WL.Server.createSQLStatement("select WOS_ID, WOS_NAME_EN, WOS_NAME_TH from WORK_ORDER_STATUS");
var getWorkOrderStatusStatement = WL.Server.createSQLStatement("select WOS_ID, WOS_NAME from WORK_ORDER_STATUS");
var updateStatusStatement = WL.Server.createSQLStatement("update WORK_ORDER SET WOO_WOS_ID = ?, WOO_DURATION = ?, WOO_UPDATED_TIME where WOO_ID = ?");
var insertCustFeedbackStatement = WL.Server.createSQLStatement("insert into CUS_FEEDBACK (CUF_WORKUNIT, CUF_WOO_ID, CUF_TIMELESS, CUF_HELPFUL, CUF_QUALITY, CUF_COMMU, CUF_OVERALL, CUF_CREATED_DATE) values (?,?,?,?,?,?,?,?) ");

// For login page
// - if login passed, return information from profile table, the application should use PRO_WORKUNIT to get work order list by work unit (call 'getWorkOrderByWorkUnit' in SQL Adapter).
// - if login failed, return 0 result.
function login(username, password) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : loginProfileStatement,
		parameters : [username, password]
	});
}
// for check that work unit's work order list is available in local database.  
// - If available, use this result for showing in ExpertTech.
// - If not available, call http adapter to get all work order under work unit and insert into local database by using (Call 'insertNewWorkUnit' function in SQL Adapter)
function getWorkOrderByWorkUnit(workunit) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getWorkOrderByWorkUnitStatement,
		parameters : [workunit]
	});
}
// Using this statement when login work unit's account at the first time.
function insertNewWorkUnit(workunit, sequence, status, product1, product2, orderno, gis, latitude, longitude) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : insertWorkOrderNewWorkUnitStatement,
		parameters : [workunit, sequence, status, product1, product2, orderno, gis, latitude, longitude]
	});
}
// for get work order detail 
// - If woo_cus_name is null, call web service to get work order detail.
// - If woo_cus_name is not null, use this result for showing in ExpertTech.
function getWorkOrderDetailByWorkUnit(workorderid) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getWorkDetailStatement,
		parameters : [workorderid]
	});
}

function getAllWorkOrderStatus(){
	return WL.Server.invokeSQLStatement({
		preparedStatement : getWorkOrderStatusStatement
	});
}

function updateWorkOrderStatus(status, duration, updatedtime, workorderid){
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateStatusStatement,
		parameters : [status, duration, updatedtime, workorderid]
	});
}
function insertCustFeedback(workunit, workorderid, timeless, helpful, quantity, commu, overall, createddate) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : insertCustFeedbackStatement,
		parameters : [workunit, workorderid, timeless, helpful, quantity, commu, overall, createddate]
	});
}
