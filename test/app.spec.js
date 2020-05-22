const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
// Const fse = require('fs-extra');

const generatorsPath = require('../lib/environment').generatorsPath;

const getFilesForOptions = require('./jhipster_utils/utils').getFilesForOptions;
const expectedFiles = require('./jhipster_utils/expected-files');

// eslint-disable-next-line import/no-dynamic-require
const angularFiles = require(`${generatorsPath}/client/files-angular`).files;

describe('JHipster generator', () => {
  context('Default configuration with', () => {
    describe('AngularX', () => {
      before(function () {
        this.timeout(20000);
        return helpers
          .create('jhipster:app')
          .withLookups([{npmPaths: path.join(__dirname, '..', 'node_modules')}, {packagePaths: path.join(__dirname, '..')}])
          .withOptions({
            'from-cli': true,
            skipInstall: true,
            skipChecks: true,
            jhiPrefix: 'test',
            blueprints: 'customizer'
          })
          .withPrompts({
            baseName: 'jhipster',
            clientFramework: 'angularX',
            packageName: 'com.mycompany.myapp',
            packageFolder: 'com/mycompany/myapp',
            serviceDiscoveryType: false,
            authenticationType: 'jwt',
            cacheProvider: 'ehcache',
            enableHibernateCache: true,
            databaseType: 'sql',
            devDatabaseType: 'h2Memory',
            prodDatabaseType: 'mysql',
            enableTranslation: true,
            nativeLanguage: 'en',
            languages: ['fr'],
            buildTool: 'maven',
            rememberMeKey: '5c37379956bd1242f5636c8cb322c2966ad81277',
            skipClient: false,
            skipUserManagement: false,
            serverSideOptions: []
          })
          .run();
      });

      it('creates expected default files for angularX', () => {
        assert.file(expectedFiles.common);
        assert.file(expectedFiles.server);
        assert.file(expectedFiles.userManagementServer);
        assert.file(expectedFiles.jwtServer);
        assert.file(expectedFiles.maven);
        assert.file(expectedFiles.dockerServices);
        assert.file(expectedFiles.mysql);
        assert.file(expectedFiles.hibernateTimeZoneConfig);
        assert.file(
          getFilesForOptions(angularFiles, {
            enableTranslation: true,
            serviceDiscoveryType: false,
            authenticationType: 'jwt',
            testFrameworks: []
          })
        );
      });
      it('contains clientFramework with angularX value', () => {
        assert.fileContent('.yo-rc.json', /"clientFramework": "angularX"/);
      });
      it('contains correct custom prefix when specified', () => {
        assert.fileContent('angular.json', /"prefix": "test"/);
      });
      it('generates a README with no undefined value', () => {
        assert.noFileContent('README.md', /undefined/);
      });
      it('uses correct prettier formatting', () => {
        // TabWidth = 2 (see generators/common/templates/.prettierrc.ejs)
        assert.fileContent('webpack/webpack.dev.js', / {2}devtool:/);
        assert.fileContent('tsconfig.json', / {2}"compilerOptions":/);
      });
    });
  });
});
