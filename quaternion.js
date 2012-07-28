
var quaternion = {};
quaternion.create = function () {
	var result = [];
	result[0] = result[1] = result[2] = 0;
	result[3] = 1;
	return result;
};

quaternion.multiply = function (op1, op2) {
	var result = [];
	result[3] = op1[3] * op2[3] - op1[0] * op2[0] - op1[1] * op2[1] - op1[2] * op2[2];
	result[0] = op1[3] * op2[0] + op1[0] * op2[3] + op1[1] * op2[2] - op1[2] * op2[1];
	result[1] = op1[3] * op2[1] - op1[0] * op2[2] + op1[1] * op2[3] + op1[2] * op2[0];
	result[2] = op1[3] * op2[2] + op1[0] * op2[1] - op1[1] * op2[0] + op1[2] * op2[3];
	return result;
};

quaternion.conjugate = function (op) {
	var result = [];
	result[0] = -op[0];
	result[1] = -op[1];
	result[2] = -op[2];
	result[3] = op[3];
};

quaternion.rotateVector = function (quat, vec) {
	//check for proper inputs?
	var vecAsQuat = [];
	vecAsQuat[0] = vec[0];
	vecAsQuat[1] = vec[1];
	vecAsQuat[2] = vec[2];
	vecAsQuat[3] = 0;

	return quaternion.multiply(quaternion.multiply(quat, vecAsQuat), quaternion.conjugate(quat));
};
//from angle axis
//get angle axis

//do I want to keep functional or go OPP?