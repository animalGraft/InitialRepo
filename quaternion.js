
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

quaternion.toMatrix = function (quat) {
	var wx2 = quat[3] * quat[0] * 2;
	var wy2 = quat[3] * quat[1] * 2;
	var wz2 = quat[3] * quat[2] * 2;
	var xy2 = quat[0] * quat[1] * 2;
	var xz2 = quat[0] * quat[2] * 2;
	var yz2 = quat[1] * quat[2] * 2;
	var xx2 = quat[0] * quat[0] * 2;
	var yy2 = quat[1] * quat[1] * 2;
	var zz2 = quat[2] * quat[2] * 2;
	var mat = [];
	mat[0] = 1 - yy2 - zz2; mat[1] = xy2 + wz2; mat[2] = xz2 - wy2;
	mat[3] = xy2 - wz2; mat[4] = 1 - xx2 - zz2; mat[5] = yz2 + wx2;
	mat[6] = xz2 + wy2; mat[7] = yz2 - wx2; mat[8] = 1 - xx2 - yy2;
	
	return mat;
}

quaternion.toString = function(quat) {
	return "w=" + quat[3] + ", x=" + quat[0] + ", y=" + quat[1] + ", z=" + quat[2];  
}

var normalize = function (axis) {
	var len = Math.sqrt(axis[0] * axis[0] +  axis[1] * axis[1] +  axis[2] * axis[2]);
	return [ axis[0] / len, axis[1] / len, axis[2] / len];
};