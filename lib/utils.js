const fs = require('fs-extra');
const path = require('path');
const tiappxml = require('tiapp.xml');
const titaniumlib = require('titaniumlib');

/**
 * Get the Titanum SDK version for a project.
 *
 * @param {String} folder - Path to the project directory.
 * @returns {String} Titanium SDK version.
 */
function getSDKVersion(folder) {
	const tiappLocation = path.join(folder, 'tiapp.xml');
	if (!fs.existsSync(tiappLocation)) {
		throw new Error('No tiapp in folder');
	}
	const tiapp = tiappxml.load(tiappLocation);
	return tiapp.sdkVersion;
}

/**
 * Given an SDK version return the default path for an SDK
 *
 * @param {*} version - Version of the SDK.
 * @returns {String} Path to the SDK.
 */
function getSDKInfo(version) {
	const sdks = titaniumlib.sdk.getSDKs();
	const sdk = sdks.find(v => v.name === version);
	return sdk;
}

/**
 * Returns all transforms
 *
 * @returns {Array<String>} Array of transform files;
 */
function listTransforms() {
	const transformsDir = path.join(__dirname, '..', 'transforms');
	// Read in out list of transforms
	return fs.readdirSync(transformsDir)
		.filter(file => fs.statSync(path.join(transformsDir, file)).isFile());
}

module.exports = {
	getSDKInfo,
	getSDKVersion,
	listTransforms
};
