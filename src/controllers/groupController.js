const {
  addGroup,
  deleteGroup,
  getAllGroups,
  addDeviceIn,
  removeDeviceOut,
  getAllDevicesInGroup,
} = require("../service/groupService");

const createResbody = require("../utils/resBody");

async function addGroupInfo(req, res, next) {
  const { userId, groupName } = req.body;
  try {
    const result = await addGroup(userId, groupName);
    res.json(createResbody(200, "Add group successfully", result));
  } catch (error) {
    res.json(createResbody(-2001, "添加失败", error));
  }
}

async function deleteGroupInfo(req, res, next) {
  const { userId, groupId } = req.body;
  try {
    const result = await deleteGroup(userId, groupId);
    res.json(createResbody(200, "Delete group successfully"));
  } catch (error) {
    res.json(createResbody(-2001, "删除失败", error));
  }
}

async function getAllGroupsInfo(req, res, next) {
  const { userId } = req.params;
  try {
    const result = await getAllGroups(userId);
    res.json(createResbody(200, "Get all groups successfully", result));
  } catch (error) {
    res.json(createResbody(-2001, "获取失败", error));
  }
}

async function addDeviceInGroup(req, res, next) {
  const { deviceId, groupId, groupName } = req.body;
  console.log("addDeviceInGroup", deviceId, groupId, groupName);
  try {
    const result = await addDeviceIn(deviceId, groupId, groupName);
    res.json(createResbody(200, "Add device in group successfully", result));
  } catch (error) {
    res.json(createResbody(-2001, "添加失败", error));
  }
}

async function removeDeviceOutGroup(req, res, next) {
  const { deviceId, groupId } = req.body;
  try {
    const result = await removeDeviceOut(deviceId, groupId);
    res.json(createResbody(200, "Remove device out of group successfully"));
  } catch (error) {
    res.json(createResbody(-2001, "移除失败", error));
  }
}

async function getAllDevicesInGroupInfo(req, res, next) {
  const { groupId } = req.params;
  try {
    const result = await getAllDevicesInGroup(groupId);
    res.json(
      createResbody(200, "Get all devices in group successfully", result)
    );
  } catch (error) {
    res.json(createResbody(-2001, "获取失败", error));
  }
}

module.exports = {
  addGroupInfo,
  deleteGroupInfo,
  getAllGroupsInfo,
  addDeviceInGroup,
  removeDeviceOutGroup,
  getAllDevicesInGroupInfo,
};
