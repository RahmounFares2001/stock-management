import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'department', 'supervisor'],
    required: true 
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "departments",
    required: function() { return this.role === 'department' }
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,  
}, { timestamps: true });

// Department Schema
const departmentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true 
  }
}, { timestamps: true });

// Stock Item Schema
const stockItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  category: { 
    type: String,
    required: true 
  },
  quantity: { 
    type: Number, 
    default: 0 
  },
  status: {
    type: String,
    enum: ['Available', 'Low Stock', 'Out Of Stock'],
    default: 'Available'
  }
}, { timestamps: true });


const departmentInventorySchema = new mongoose.Schema({
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "departments",
    required: true
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stockItems",
    required: true
  },
  code: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  assignedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Returned', 'Damaged'],
    default: 'Active'
  }
}, { timestamps: true });


const reportSchema = new mongoose.Schema({
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "departments",
    required: true
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stockItems",
    required: true
  },
  type: {
    type: String,
    enum: ['Damage', 'Maintenance'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending','Resolved'],
    default: 'Pending'
  },
  reportedQuantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  resolvedDate: {
    type: Date
  }
}, { timestamps: true });


// Create models
const User = mongoose.models.users || mongoose.model("users", userSchema);
const Department = mongoose.models.departments || mongoose.model("departments", departmentSchema);
const StockItem = mongoose.models.stockItems || mongoose.model("stockItems", stockItemSchema);
const DepartmentInventory = mongoose.models.departmentInventory || mongoose.model("departmentInventory", departmentInventorySchema);
const Report = mongoose.models.reports || mongoose.model("reports", reportSchema);

export { User, Department, StockItem, DepartmentInventory, Report };