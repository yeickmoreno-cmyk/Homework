
//YJ 
import { MenuNode } from './menu-node';
import { Profile } from '../pages/profile/profile';
import { Messages } from '../pages/messages/messages';
import { Settings } from '../pages/settings/settings';
import { Account } from '../pages/account/account';
import { ProfileSettings } from '../pages/profile-settings/profile-settings';
import { SecurityPrivacy } from '../pages/security-privacy/security-privacy';
import { Password } from '../pages/password/password';
import { Notification } from '../pages/notification/notification';
import { Help } from '../pages/help/help';
import { Faqs } from '../pages/faqs/faqs';
import { SubmitTicket } from '../pages/submit-ticket/submit-ticket';
import { NetworkStatus } from '../pages/network-status/network-status';
import { TreeView } from '../pages/tree-view/tree-view';
import { Logout } from '../pages/logout/logout';


const settings = new MenuNode('Settings', '/settings', Settings, true)
  .addChild(new MenuNode('Account', '/settings/account', Account))
  .addChild(new MenuNode('Profile', '/settings/profile', ProfileSettings))
  .addChild(new MenuNode('Security & Privacy', '/settings/security-privacy', SecurityPrivacy))
  .addChild(new MenuNode('Password', '/settings/password', Password))
  .addChild(new MenuNode('Notification', '/settings/notification', Notification));

const help = new MenuNode('Help', '/help', Help, true)
  .addChild(new MenuNode("FAQ's", '/help/faqs', Faqs))
  .addChild(new MenuNode('Submit a Ticket', '/help/submit-a-ticket', SubmitTicket))
  .addChild(new MenuNode('Network Status', '/help/network-status', NetworkStatus));

// Root del arbol
export const menuTree = new MenuNode('root', '')
  .addChild(new MenuNode('Profile', '/profile', Profile))
  .addChild(new MenuNode('Messages', '/messages', Messages))
  .addChild(settings)
  .addChild(help)
  .addChild(new MenuNode('Binary Tree', '/binary-tree', TreeView))
  .addChild(new MenuNode('Logout', '/logout', Logout, false, true));