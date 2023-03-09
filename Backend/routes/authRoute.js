const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 1.5,
  },
});
const {
  verifyJwt,
  clientVerifyJwt,
} = require("../middlewares/jwtverification");

//contollers
const {
  register,
  login,
  Logout,
  payment,
  verify,
  checkEmail,
  GetSingleUser,
  GetAllUser,
  stage4,
  modellatest,
  ModelData,
  AddProfilePicture,
  AddImage,
  AddVideo,
  deleteImage,
  GetProfilePicture,
  getByStatus,
  progress,
  createEnquiry,
  getEnquiryData,
  ChangePassword,
  deleteData,
  approveImage,
  rejectImage,
  pendingImage,
  admindelete,
  modelTrash,
  modelRestore,
  createUserSpecialStory,
  deleteUserSpecialStory,
  getUserSpecialStory,
  updateUserSpecialStory,
  adminspecialstoryInactive,
  adminspecialstoryRejected,
  deleteAdminUserSpecialStory,
  deleteUserVideo,
  approveVideo,
  deleteAdminUserVideo,
  rejectVideo,
  pendingVideo,
  updateUser,
  forgotpassword,
  resettoken,
  updateAdminUser,
  adminenquiryActive,
  adminenquiryInactive,
  adminenquirydelete,
  acceptNewModel,
  deletemultiple,
  checkMobile,
} = require("../controllers/user/userController");
const {
  createClient,
  getClient,
  clientlogin,
  clientlogout,
  createClientCasting,
  singleClientCastingCall,
  createUserCastingCall,
  modelEnquiry,
  ClientChangePassword,
  getModels,
  getcastingmodels,
  deleteEnquiredModels,
  getclientcastingcalls,
  deleteclientcastingcall,
  getClientbyid,
  getcastingmodelsAdmin,
  castingInactive,
  castingactive,
  deleteAdminCastingcall,
  editadmincastingcall,
  updateClientCasting,
  clientActive,
  clientInactive,
  clientPending,
  clientDelete,
  adminclientenquiredmodels,
  clientEmailAlreadyTaken,
  clientPhoneAlreadyTaken,
  createAdminClientCasting,
  Clientforgotpassword,
  Clientresettoken
} = require("../controllers/client/clientContoller");
const {
  createTeam,
  getSingleTeam,
  getByMember,
  getAllOurTeam,
  adminInactive,
  adminActive,
  adminEdit,
  adminDelete,
} = require("../controllers/ourTeam/ourTeam");
const {
  createBlog,
  getSingleBlog,
  getAll,
  adminBlogEdit,
  adminBlogActive,
  adminBlogInactive,
  adminBlogDelete,
} = require("../controllers/blog/blog");
const {
  createTestimony,
  getAllTestimony,
  adminTestiActive,
  adminTestiInactive,
  adminTestiEdit,
  adminTestiDelete,
} = require("../controllers/testimony/testimony");
const { createNewsletter } = require("../controllers/newsletter/newsletter");
const { createContactus } = require("../controllers/contactus/contactus");
const { createAwards, getAwards } = require("../controllers/awards/awards");

//user
router.post("/user/register/stage1", register);
router.post("/user/register/login", login);
router.post("/user/register/logout", Logout);
router.post("/user/register/payment", payment);
router.post("/user/register/verify", verify);
router.post("/user/register/Enquiry", createEnquiry);
router.post("/user/register/ForgotPassword/:id", forgotpassword);
router.post("/user/register/resetToken/:token", resettoken);
router.post("/user/register/ChangePassword/changed", ChangePassword);
router.post("/user/register/stage4", upload.array("images"), stage4);
router.post("/user/register/AddImage", upload.array("images", 12), AddImage);
router.post(
  "/user/register/Featuredimages/specialstory",
  upload.single("images"),
  createUserSpecialStory
);
router.post("/user/register/ModelTrash/:id", modelTrash);
router.post("/user/register/ModelRestore/:id", modelRestore);
router.post(
  "/user/register/AddProfilePicture",
  upload.single("images"),
  AddProfilePicture
);
router.post("/user/register/AddVideo", AddVideo);
router.put("/user/register/accept/newmodel/:id", acceptNewModel);
router.put("/user/register/user/update/personal", updateUser);
router.put("/user/register/user/update/AdminUser/:id", updateAdminUser);
router.put("/user/register/approveVideos/:id", approveVideo);
router.put("/user/register/rejectVideos/:id", rejectVideo);
router.put("/user/register/pendingVideos/:id", pendingVideo);
router.put("/user/register/approveImages/:id", approveImage);
router.put("/user/register/rejectImages/:id", rejectImage);
router.put("/user/register/pendingImages/:id", pendingImage);
router.put(
  "/user/register/adminspecialstory/specialstoryactive/:id",
  adminspecialstoryInactive
);
router.put(
  "/user/register/adminspecialstory/specialstoryrejected/:id",
  adminspecialstoryRejected
);
router.put("/user/register/UserSpecialStory/update", updateUserSpecialStory);
router.put("/user/register/admin/portFolio/active/:id", adminenquiryActive);
router.put("/user/register/admin/portFolio/inactive/:id", adminenquiryInactive);
router.put("/user/register/admin/portFolio/delete/:id", adminenquirydelete);
router.delete("/user/register/AddImage/:id", deleteImage);
router.delete("/user/register/UserSpecialStory", deleteUserSpecialStory);
router.delete(
  "/user/register/AdminUserSpecialStory/admin/delete/:id",
  deleteAdminUserSpecialStory
);
router.delete("/user/register/:userId/Adminimages/:imageId", admindelete);
router.delete("/user/register/stage1/delete/:id", deleteData);
router.delete("/user/register/videos/delete/:id", deleteUserVideo);
router.delete("/user/register/:userid/videos/delete/:id", deleteAdminUserVideo);
router.delete("/user/register/stage1/deletemultiple", deletemultiple);
router.get("/user/register/stage1/:id", verifyJwt, GetSingleUser);
router.get("/user/register/stage1/", verifyJwt, GetAllUser);
router.get("/user/register/profile/:id", verifyJwt, GetProfilePicture);
router.get("/user/register/", modellatest);
router.get("/user/register/:id", ModelData);
router.get("/user/register/progress/progress", progress);
router.get("/user/register/paymentStatus/:paymentStatus", getByStatus);
router.get("/user/register/Enquiry/:enquiry", getEnquiryData);
router.get("/user/register/getUserSpecialStory", getUserSpecialStory);
router.get("/user/register/check/email", checkEmail);
router.get("/user/register/check/mobile", checkMobile);

//client
router.post("/client/register", upload.array("images", 2), createClient);
router.post("/client/register/login", clientlogin);
router.post("/client/register/logout", clientlogout);
router.post("/Client/register/ChangePassword/changed", ClientChangePassword);
router.post("/client/register/modelenquiry/:id", modelEnquiry);
router.post("/client/register/ForgotPassword/:id", Clientforgotpassword);
router.post("/client/register/resetToken/:token", Clientresettoken);
router.post(
  "/client/register/createcasting",
  upload.single("image"),
  createClientCasting
);
router.post(
  "/client/register/Admin/createcasting/:email",
  upload.single("image"),
  createAdminClientCasting
);
router.post(
  "/client/register/castingcall/:castingCallId",
  createUserCastingCall
);
router.put("/client/register/Inactive/:id", castingInactive);
router.put("/client/register/active/:id", castingactive);
router.put(
  "/client/register/castingcallsss/:castingCallId/edit",
  upload.single("image"),
  editadmincastingcall
);
router.put(
  "/client/register/createcasting/update/:id",
  upload.single("image"),
  updateClientCasting
);
router.put("/client/register/admin/client/active/:id", clientActive);
router.put("/client/register/admin/client/Inactive/:id", clientInactive);
router.put("/client/register/admin/client/Pending/:id", clientPending);
router.get("/client/register/check/email", clientEmailAlreadyTaken);
router.get("/client/register/check/mobile", clientPhoneAlreadyTaken);
router.get("/client/register", getClient);
router.get("/client/register/getclient/:id", getClientbyid);
router.get(
  "/client/register/castingcall/:castingCallId",
  singleClientCastingCall
);
router.get("/client/register/verify", clientVerifyJwt, getClient);
router.get("/client/register/getmodel", getModels);
router.get(
  "/client/register/admin/client/getModels/:id",
  adminclientenquiredmodels
);
router.get("/client/register/getcastingmodels", getcastingmodels);
router.get("/client/register/castingCalls/:id", getcastingmodelsAdmin);
router.get("/client/register/getclientcastingcalls", getclientcastingcalls);
router.delete("/client/register/modelenquiry/:id", deleteEnquiredModels);
router.delete(
  "/client/register/deleteAdmincastingcall/:id",
  deleteAdminCastingcall
);
router.delete(
  "/client/register/castingcall/:castingCallId",
  deleteclientcastingcall
);
router.delete("/client/register/admin/client/delete/:id", clientDelete);

//ourTeam
router.post("/ourTeam", upload.single("image"), createTeam);
router.post("/ourTeam/admin/Inactive/:id", adminInactive);
router.post("/ourTeam/admin/active/:id", adminActive);
router.put("/ourTeam/admin/edit/:id", upload.single("image"), adminEdit);
router.get("/ourTeam", getSingleTeam);
router.get("/ourTeam/getAll", getAllOurTeam);
router.get("/ourTeam/:selectmember", getByMember);
router.delete("/ourTeam/admin/admindelete/:id", adminDelete);

//Blog
router.post("/Blog", upload.single("image"), createBlog);
router.post("/Blog/admin/Inactive/:id", adminBlogInactive);
router.post("/Blog/admin/active/:id", adminBlogActive);
router.put("/Blog/admin/edit/:id", upload.single("image"), adminBlogEdit);
router.get("/Blog/:id", getSingleBlog);
router.get("/Blog", getAll);
router.delete("/Blog/admin/admindelete/:id", adminBlogDelete);

//Testimony
router.post("/Testimony", upload.single("image"), createTestimony);
router.put("/Testimony/admin/Inactive/:id", adminTestiInactive);
router.put("/Testimony/admin/active/:id", adminTestiActive);
router.put("/Testimony/admin/edit/:id", upload.single("image"), adminTestiEdit);
router.get("/Testimony", getAllTestimony);
router.delete("/Testimony/admin/admindelete/:id", adminTestiDelete);

//Newsletter
router.post("/Newsletter/create", createNewsletter);

//Awards
router.put("/Awards/update", createAwards);
router.get("/Awards/get", getAwards);

//Contactus
router.post("/Contactus/create/users", createContactus);

module.exports = router;
