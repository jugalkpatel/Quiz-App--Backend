import { Sprint } from "../models/index.js";

const findByLevel = async (level) => {
  const isRecordsExits = await Sprint.find({ level });

  return isRecordsExits;
};

export { findByLevel };
