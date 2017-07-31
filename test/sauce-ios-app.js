import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import wd from 'wd';
import {parse} from './helpers/creds';

let creds = parse();
let should = chai.should();
chai.use(chaiAsPromised);
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

/*
 * You will need to upload a native iOS app to the sauce storage API.
 * Details: https://docs.saucelabs.com/reference/rest-api/#temporary-storage
 * The app for the test below can also be found at:
 * https://s3.amazonaws.com/sauce-misc/SampleCustomerApp.app.zip
 */

let app = wd.promiseChainRemote(creds.HOST, creds.PORT, creds.USER, creds.KEY);

describe('on a real iOS device...', function() {
    this.timeout(240000);
    before(async () => {
        try {
            await app.init({
                deviceName:'iPhone 6 Device',
                platformName:'iOS',
                platformVersion:'10.3',
                app:'/Users/admin/Downloads/appium-test-master/test/application.app',
            });
        } catch(err) {
            should.not.exist('Error connecting to Sauce Labs!', err);
        }
    });
    it('should load a simple iOS native app and switch views', async () => {
        try {
            console.log('done');
        } catch (err) {
            should.not.exist('Error during test!', err);
        }
    });
    after(async () => {
        try {
            await app.quit();
        } catch(err) {
            should.not.exist('Error quitting?', err);
        }
    });
});
