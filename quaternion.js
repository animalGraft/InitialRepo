quaternion = {};
quaternion.create = function(inQuat)
{
	var result = new Float32Array(4);
	result[0] = result[1] = result[2] = 0;
	result[3] = 1;
	return result;
}

quaternion.multiply = function(op1, op2)
{
	var result = new Float32Array(4);
//var result.w = op1.w * op2.w 	- op1.x * op2.x 	- op1.y * op2.y 	- op1.z * op2.z;
//var result.x = op1.w * op2.x 	+ op1.x * op2.w 	+ op1.y * op2.z 	- op1.z * op2.y;
//var result.y = op1.w * op2.y	- op1.x * op2.z 	+ op1.y * op2.w 	+ op1.z * op2.x;
//var result.y = op1.w * op2.z 	+ op1.x * op2.y 	- op1.y * op2.x 	+ op1.z * op2.w;
	
	var result[3] = op1[3] * op2[3] 	- op1[0] * op2[0] 	- op1[1] * op2[1] 	- op1[2] * op2[2];
	var result[0] = op1[3] * op2[0] 	+ op1[0] * op2[3] 	+ op1[1] * op2[2] 	- op1[2] * op2[1];
	var result[1] = op1[3] * op2[1]		- op1[0] * op2[2] 	+ op1[1] * op2[3] 	+ op1[2] * op2[0];
	var result[1] = op1[3] * op2[2] 	+ op1[0] * op2[1] 	- op1[1] * op2[0] 	+ op1[2] * op2[3];
	
	return result;
}

//from angle axis
//get angle axis

//do I want to keep functional or go OPP?