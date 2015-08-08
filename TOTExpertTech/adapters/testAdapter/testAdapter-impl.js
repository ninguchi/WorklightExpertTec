/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
	
function _retrieve(params) {	
	if (!params)
		return { 'isSuccessful': false, 'errorMsg' : 'params is ' + params};
	
	
	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : 'citiesJSON',
	    parameters: { 'north': params.north, 'south': params.south, 'east': params.east, 'west': params.west, 'lang': params.lang, 'username': params.username },
	    headers: {"Accept":"application\/json"} 
	};
	
	return WL.Server.invokeHttp(input);
}
	

//
// Utility Functions 
//

function encodeBaseAuth(user, password) {
    var hash = WL.SecurityUtils.base64Encode(user + ':' + password);
    return "Basic " + hash;
}