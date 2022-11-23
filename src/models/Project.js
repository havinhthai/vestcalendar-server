const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  ticker: {
    type: String,
    trim: true,
    required: true,
  },
  coingeckoId: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'categories',
  }],
  distributionTimeline: {
    type: [{
      timezone: {
        type: String,
        trim: true,
        required: true,
      },
      time: {
        type: Date,
        required: true,
      },
      title: {
        type: String,
        trim: true,
        required: true,
      },
      description: {
        type: String,
      },
      isDisplayDate: {
        type: Boolean,
        default: false,
      },
      isDisplayTime: {
        type: Boolean,
        default: false,
      },
      allocations: {
        type: [{
          ref: {
            type: Number,
            default: '-1',
          },
          percent: {
            type: Number,
            min: 0,
            max: 100,
          },
        }],
      },
    }],
    default: [],
  },
  links: {
    type: [{
      linkType: {
        type: String,
        trim: true,
        required: true,
      },
      url: {
        type: String,
        trim: true,
        required: true,
      },
    }],
    default: [],
  },
  totalSupply: {
    type: Number,
    required: true,
    min: 0,
  },
  circulatingSupply: {
    type: Number,
    required: true,
    min: 0,
  },
  // privateTimeline: {
  //   currentProgress: {
  //     type: Number,
  //     required: true,
  //     min: 0,
  //     max: 100,
  //   },
  //   nextProgress: {
  //     type: Number,
  //     required: true,
  //     min: 0,
  //     max: 100,
  //   },
  // },
  allocations: {
    type: [{
      title: {
        type: String,
        trim: true,
        required: true,
      },
      percent: {
        type: Number,
        required: true,
      },
      // saleOption: {
      //   type: String,
      //   trim: true,
      //   required: true,
      // },
    }],
    default: [],
  },
  tgeSummary: {
    type: [{
      title: {
        type: String,
        trim: true,
        required: true,
      },
      value: {
        type: String,
        trim: true,
        required: true,
      },
      valueType: {
        type: String,
        enum: ['TEXT', 'NUMBER', '%', 'USD'],
        required: true,
        trim: true,
      },
    }],
    default: [],
  },
  vestingSchedule: {
    type: [{
      title: {
        type: String,
        trim: true,
        required: true,
      },
      description: {
        type: String,
      },
      tgeUnlock: {
        type: Number,
        min: 0,
      },
      tokenPrice: {
        type: Number,
        min: 0,
      },
      cliffMonths: {
        type: Number,
        min: 0,
      },
      vestingMonths: {
        type: Number,
        min: 0,
      },
    }],
    default: [],
  },
  vestingMonthStart: {
    type: String,
    trim: true,
  },
  vestingRoiMaxPrice: {
    type: Number,
    min: 0,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'administrators',
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('projects', projectSchema);
