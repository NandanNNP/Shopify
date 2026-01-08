import mongoose from "mongoose";

const TimerSchema = new mongoose.Schema(
  {
    shop: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["FIXED", "EVERGREEN"],
      required: true,
    },

    startAt: Date,
    endAt: Date,

    evergreenDurationMinutes: Number,

    targeting: {
      type: {
        type: String,
        enum: ["ALL", "PRODUCTS", "COLLECTIONS"],
        required: true,
      },
      productIds: [String],
      collectionIds: [String],
    },

    appearance: {
      text: String,
      textColor: String,
      backgroundColor: String,
      position: String,
    },

    impressionCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "SCHEDULED", "EXPIRED"],
      default: "SCHEDULED",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Timer || mongoose.model("Timer", TimerSchema);
