import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'

export function MessageBody(type, text, media) {
    this.type = type;
    this.text = text;
    this.media = media;
}

export function Message(senderId, roomId, body, updateAt, senderName) {
    this.id = UUID()
    this.senderId = senderId;
    this.roomId = roomId;
    this.body = body;
    this.createdAt = new Date().getTime();
    this.updatedAt = updateAt;
    this.senderName = senderName
}

export function Room(roomName, thumbnail, background, limit = 10, updateAt, state, type, rules = [], members) {
    this.id = UUID()
    this.roomName = roomName
    this.members = members;
    this.thumbnail = thumbnail
    this.background = background
    this.limit = limit
    this.createdAt = new Date().getTime()
    this.updateAt = updateAt
    this.state = state
    this.rules = rules
//    [work,personal,groups]
}

export function Member(roomId) {
    this.id = UUID()
}

export function ChatList(roomId, name, userId, unReadMessage, lastSeenAt, lastMessage, state, updateAt, type, key) {
    this.id = UUID();
    this.name = name;
    this.roomId = roomId;
    this.userId = userId;
    this.unReadMessage = unReadMessage;
    this.lastSeenAt = lastSeenAt;
    this.lastMessage = lastMessage;
    this.state = state
    this.updatedAt = updateAt;
    this.createdAt = new Date().getTime()
    this.type = type
    this.key = key
}

export function Role(roleName) {
    this.id = UUID()
    this.roleName = roleName
}

export function UserRoleInRoom(userId, roomId, roleId) {
    this.id = UUID()
    this.userId = userId;
    this.roomId = roomId;
    this.roleId = roleId
}

export function User(id = "", username, email, password, age, phone, address, birthday, avatar) {
    this.id = id !== "" ? id : UUID()
    this.avatar = avatar || "";
    this.address = address;
    this.birthday = birthday || null;
    this.verify = false;
    this.accountStatus = true;
    this.activeStatus = false;
    this.lastTimeActive = new Date().getTime();
    this.username = username;
    this.email = email;
    this.password = password;
    this.age = age;
    this.phone = phone;
}