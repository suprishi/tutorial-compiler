import * as jasmine from 'jasmine'; 
import * as path from 'path';
import { DirUtils } from '../../../runners/katacoda/dirUtils';

jasmine.describe("DirUtils", () => {
  let target = new DirUtils();
  jasmine.describe("changeCurrentDir", () => {
    jasmine.it("is already in the right folder", () => {
      jasmine.expect(target.getCdParam(path.join('/root'), path.join('/root'))).toBe('');
    });
    jasmine.it("changes directly to the child folder, because currentDir is the prefix of dir", () => {
      jasmine.expect(target.getCdParam(path.join('/root/devonfw'), path.join('/root/devonfw/setup'))).toBe(path.join('setup'));
    });
    jasmine.it("returns an absolute path, because both dirs don't have matching parent folders", () => {
      jasmine.expect(target.getCdParam(path.join('/setup'), path.join('/root/devonfw/setup'))).toBe(path.join('/root/devonfw/setup'));
    });
    jasmine.it("changes to parent folder before changing to child folder", () => {
      jasmine.expect(target.getCdParam(path.join('/root/devonfw'), path.join('/root/setup/folder0/folder1'))).toBe(path.join('../setup/folder0/folder1'));
    });
    jasmine.it("changes to parent folder before changing to child folder and one child folder has the same position and name", () => {
      jasmine.expect(target.getCdParam(path.join('/root/devonfw/folder/setup'), path.join('/root/devonfw/setup/setup'))).toBe(path.join('../../setup/setup'));
    });

  });
});
