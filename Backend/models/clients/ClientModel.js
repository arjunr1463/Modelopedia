const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    min: 100,
    max: 999,
  },
  fullname: {
    type: String,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  cmpnycertificate: {
    data: Buffer,
    contentType: String,
  },
  cmpnylogo: {
    data: Buffer,
    contentType: String,
  },
  policy: {
    type: String,
    required: true,
  },
  personalStatus: {
    type: String,
    default: "Pending",
  },
  enquiredmodels: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  castingcall: [
    {
      users: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        },
      ],
      title: {
        type: String,
      },
      discription: {
        type: String,
      },
      image: {
        data: Buffer,
        contentType: String,
      },
      status: {
        type: String,
        default: "Active",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  oldpassword: {
    type: String,
  },
  newpassword: {
    type: String,
  },
  newconfirmpassword: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
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

userSchema.pre("save", async function (next) {
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
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Client", userSchema);
