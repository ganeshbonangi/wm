'use strict';
angular.module('workerManagementSystemApp')
  .service('locationSer', function(){
      this.lng='';
      this.lat='';
      this.address='';
      this.mapMarkerHtml = function (users) {
       		var userSection = {
       			workers:[],
       			admins:[],
       			employers:[]
       		};
		    for(var i=0;i<users.length;i++){
		        var b = [];
		        var user = users[i];
		        if(typeof user != undefined ){
		        	if(user.role === "worker" || user.role === 'admin') {
			        	var jsonStr = JSON.stringify(user);
	         			b[0]="<div><a onclick='edit("+jsonStr+")' class='pull-right operation_Icons'><i class='glyphicon glyphicon-edit'></i> Edit</a><a  onclick='del("+jsonStr+")'  class='pull-right operation_Icons'><i class='glyphicon glyphicon-trash'></i> Delete &nbsp;</a></div>";
				       	b[0] += "<div>"+user.name+"</div><hr/><div>"+user.gender+"</div><hr/><div>"+user.status+"</div><hr/><div>"+user.mobile+"</div>";
			    	}
			        b[1] = parseFloat(user.location.lat);
			        b[2] = parseFloat(user.location.lng);
			        b[3] = user.name;
			        b[4] = user.status;
			        if(user.role === "worker") {
			          	userSection.workers.push(b);
			        } else if(user.role === 'admin') {
			          	userSection.admins.push(b);
			        } else if (user.role === 'employer') {
			        	userSection.employers.push(b);
			        }	
		        }
		    }
		    return userSection;
      };
      this.mapMarkerHtmlForOrders = function(orders){
      	  var markup = [];
	      for(var i=0;i<orders.length;i++){
	        var b = [];
	        var order = orders[i];
	        var jsonStr = JSON.stringify(order);
	        var options = "<option value='pending' "+(order.status=="pending"?"selected":"")+">Pending</option> <option value='completed' "+(order.status=="completed"?"selected":"")+">Completed</option>";
	          b[0] = "<div><select onchange='updateOrder("+jsonStr+")'>"+options+" </select></div><div>"
	          +order.startDate+"</div><div>"+order.endDate+"</div><div>"+order.startTime+"</div><div>"+order.endTime+"</div><div>"+order.availebleDay+"</div><div>"+order.typeOfShift+"</div><div>"+order.typeOfWork+"</div><div>Ph:"+order.mob+"</div><div>Needed:"+order.empCount+"</div><div>Desc:"+order.desc+"</div><div>mail:"+order.email+"</div>";
	          b[1] = parseFloat(order.location.lat);
	          b[2] = parseFloat(order.location.lng);
	          b[3] = order.name;
	          b[4] = order.status;
	          markup.push(b);
	          console.log(options);
	      }
      	return markup;
      };
  });