const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const Client = require("../clients/ClientModel");

const UserSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    min: 100,
    max: 999,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  eyecolor: {
    type: String,
  },
  haircolor: {
    type: String,
  },
  hairsize: {
    type: String,
  },
  hairtype: {
    type: String,
  },
  shoesize: {
    type: String,
  },
  dresssize: {
    type: String,
  },
  bodytype: {
    type: String,
  },
  skintone: {
    type: String,
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  aboutyourself: {
    type: String,
  },
  dob: {
    type: Date,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  postcode: {
    type: String,
  },
  state: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmpassword: {
    type: String,
  },
  gender: {
    type: String,
  },
  language: {
    type: Array,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  experience: {
    type: String,
  },
  privacy: {
    type: String,
  },

  profilepicture: {
    data: Buffer,
    contentType: String,
  },

  images: [
    {
      image: {
        data: Buffer,
        contentType: String,
      },

      imagestatus: {
        type: String,
        default: "Pending",
      },
    },
  ],
  videos: [
    {
      url: { type: String },
      videostatus: {
        type: String,
        default: "Pending",
      },
    },
  ],
  personalStatus: {
    type: String,
    default: "Completed",
  },
  specialstory: {
    featuredimages: {
      data: Buffer,
      contentType: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
    specialdescription: {
      type: String,
    },
  },

  paymentStatus: {
    type: String,
    default: "pending",
  },
  paymentType: {
    type: String,
  },
  transactionId: {
    type: String,
    default: "",
  },
  planEndDate: {
    type: Date,
    default: Date.now,
  },
  planDate: {
    type: Date,
    default: Date.now,
  },
  progress: {
    type: Number,
    default: 1,
  },
  enquiry: {
    type: String,
    default: "",
  },
  enquiryStatus: {
    type: String,
    default: "Pending",
  },
  oldpassword: {
    type: String,
  },
  newpassword: {
    type: String,
  },
  newmodel: {
    type: Boolean,
    default: true,
  },
  newconfirmpassword: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isNew) {
    generateId(user, next);
  } else {
    next();
  }
});
function generateId(user, next) {
  const id = Math.floor(Math.random() * 900) + 100;
  user.constructor.findOne({ id: id }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (!existingUser) {
      user.id = id;
      next();
    } else {
      generateId(user, next);
    }
  });
}

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.pre("remove", async function (next) {
  console.log("Remove hook called");
  try {
    const userId = this._id;
    await Client.updateMany(
      { "castingcall.users.userId": userId },
      { $pull: { "castingcall.users": { userId } } }
    );
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
