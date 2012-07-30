
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
	return result;
};

quaternion.rotateVector = function (quat, vec) {
	var vecAsQuat = [];
	vecAsQuat[0] = vec[0];
	vecAsQuat[1] = vec[1];
	vecAsQuat[2] = vec[2];
	vecAsQuat[3] = 0;

	return quaternion.multiply(quaternion.multiply(quat, vecAsQuat), quaternion.conjugate(quat));
};

quaternion.fromAngleAxis = function (angle, axis) {
	var angleRads = angle * (Math.PI / 180);
	var sinAngle = Math.sin(angleRads * 0.5);
	var normalAxis = normalize(axis);
	return [sinAngle * normalAxis[0], sinAngle * normalAxis[1], sinAngle * normalAxis[2], Math.cos(angleRads * 0.5)];
};

var normalize = function (axis) {
	var len = Math.sqrt(axis[0] * axis[0] +  axis[1] * axis[1] +  axis[2] * axis[2]);
	return [ axis[0] / len, axis[1] / len, axis[2] / len];
};