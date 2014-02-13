M.LoginAs = M.LoginAs || {};
M.LoginAs.ENROLPAGETYPE = 'page-enrol-users';
M.LoginAs.PARTICIPANTSPAGETYPE = 'page-course-view';

M.LoginAs.init = function(Y, params){
	var regex_participants = 'page-course-view-*';
    var loginaslink = params.loginaslink;
    var bodyid = params.bodyid;
    var pagetype = params.pagetype;
    if (pagetype !== null) {
            if (bodyid == M.LoginAs.ENROLPAGETYPE && pagetype == M.LoginAs.ENROLPAGETYPE) {
                //Show on Enrolled Users page
                var showonEnrolledUsersPage = true;
            }
            //if (bodyid == M.LoginAs.PARTICIPANTSPAGETYPE && pagetype.match(regex_participants) !== null) {
            	if (bodyid.match(regex_participants) !== null && pagetype.match(regex_participants) !== null) {
                //Show on Participants Page
                var showonParticipantsPage = true;
            }
    }
    YUI().use('overlay',"event-contextmenu", 'querystring-parse', 'anim', function (Y) {
        //Declarations	
        var bodyContent = '<div id = "contextmenu_box"><ul id = "contextmenu\" ><li>Login As</li><li>View Profile</li></ul></div>';
        var contextMenu = new Y.Overlay({
            srcNode: '#contextmenu_box',
            visible: false,
            width: "140px",
            zIndex: 2,
        });
        contextMenu.render('');
		 var showMenu = function (e) {
                e.preventDefault();
                Y.one('#contextmenu_box').setStyle('display', 'block');
                //Get the url of the user
                var userURL = '';

                //Using switch to achieve multiple page type
                switch (bodyid) {
                case M.LoginAs.PARTICIPANTSPAGETYPE:
                    userURL = e._currentTarget.parentElement.href;
                    break;
                case M.LoginAs.ENROLPAGETYPE:
                    userURL = e._currentTarget.childNodes[0].href;
                    break;
                }
                /*if(pagetype == M.LoginAs.PARTICIPANTSPAGETYPE )
		{
			 userURL = e._currentTarget.parentElement.href;
		}
		else{
			 userURL = e._currentTarget.childNodes[0].href;
		}*/
                var queryParams = Y.QueryString.parse(userURL.substring(userURL.indexOf('?') + 1));
                var loginasLink = M.cfg.wwwroot + loginaslink + 'id=' + queryParams.course + '&user=' + queryParams.id + '&sesskey=' + M.cfg.sesskey;
                var profileLink = M.cfg.wwwroot + '/user/profile.php?id=' + queryParams.id;
                Y.one('#profilelink').setAttribute('href', profileLink);
                var loginNode = Y.one('#loginas').setAttribute('href', loginasLink);
                var a = Y.WidgetPositionAlign;
                contextMenu.set("align", {
                    node: e._currentTarget,
                    points: [a.TL, a.TR]
                });
                //From the URL, get the userid
                if (contextMenu.get('visible') == true) {
                    contextMenu.hide();
                } else {
                    contextMenu.show();
                }
 
        }
        var userNodes = null;
        if (showonEnrolledUsersPage) {
            userNodes = Y.all('.userenrolment .subfield_picture');
            console.log(userNodes);
        }
        if (showonParticipantsPage) {
            userNodes = Y.all('#participants .userpicture');
        }
        if (null != userNodes) {
        	console.log("Ready to use context menu on this page");
        	//userNodes.on('contextmenu', function(){console.log("Right-click");}, bodyid);
            userNodes.on('contextmenu', showMenu, bodyid);
        }
       
    }); //YUI use()

}