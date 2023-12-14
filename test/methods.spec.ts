import chai, { expect } from "chai";
import sinon, { SinonSpy, SinonStub } from "sinon";
import bcrypt from "bcryptjs";
import { server } from "../src/app";
import { user } from "../src/models/users";
import { getHashPassword } from "../src/utils/password";
import { hospital } from "../src/models/hospital";
import { storage } from "../src/routes/route";
describe("Model Password Testing", () => {
  let stub1: SinonStub;
  let stub2: SinonStub;
  afterEach(() => {
    if (stub1) stub1.restore();
    if (stub2) stub2.restore();
  });
  after(() => {
    server.close();
  });
  const pswd = "Falgun17@";
  const hash = getHashPassword("Falgun17@");
  it("should hash the password before creating user", () => {
    const fakeInstance: any = {
      setDataValue: sinon.spy(),
    };
    stub1 = sinon.stub(bcrypt, "genSalt");
    stub2 = sinon.stub(bcrypt, "hashSync").returns(hash);
    user.rawAttributes.password.set?.call(fakeInstance, pswd);
    expect(fakeInstance.setDataValue.calledWith(pswd, hash));
  });
  it("should hash the password before creating hospiital", () => {
    const fakeInstance: any = {
      setDataValue: sinon.spy(),
    };
    stub1 = sinon.stub(bcrypt, "genSalt");
    stub2 = sinon.stub(bcrypt, "hashSync").returns(hash);
    hospital.rawAttributes.password.set?.call(fakeInstance, pswd);
    expect(fakeInstance.setDataValue.calledWith(pswd, hash));
  });
});
// describe('Multer Storage Testing', () => {
//     const file={originalName:"image.jpg"}
//   it("should set the name correctly",()=>{
//  storage.filename()
//   })
// })

