export default {
  'pages.layouts.userLayout.title': 'userLayout.title',

  'pages.login.accountLogin.tab': 'Account Login',
  'pages.login.accountLogin.errorMessage': 'Incorrect username/password',
  'pages.login.failure': 'Login failed, please try again!',
  'pages.login.success': 'Login successful!',
  'pages.login.username.placeholder': 'User Name',
  'pages.login.username.required': 'Please input your username!',
  'pages.login.password.placeholder': 'Password',
  'pages.login.password.required': 'Please input your password!',
  'pages.login.failure.lock':
    'The current account has been locked. Please try again in 60 seconds.',

  'pages.login.rememberMe': 'Remember me',
  'pages.login.rememberMeIng': 'Auto Login',
  'pages.login.submit': 'Login',
  'pages.logout': 'Logout',
  'pages.loginSetting': 'Login Configuration',
  'pages.loginSetting.title': 'Login Configuration',
  'pages.loginSetting.observe': 'Observation Time',
  'pages.loginSetting.observe.tip':
    'When the user browses the interface for more than the observation time, the system will force the user to log out.',
  'pages.loginSetting.lockCount.tip':
    'If the maximum number of consecutive login failures is reached, the user will enter lock mode, which defaults to 5 times. The minimum number of login failures within 60 seconds is 5.',
  'pages.loginSetting.observe.operationTip':
    'The user must log out and then log in again for the change to take effect.',
  'pages.loginSetting.time': 'Account Lockout Duration',
  'pages.loginSetting.count': 'Account Lockout Threshold',
  'pages.loginSetting.second': 'Seconds',

  'pages.admin.subPage.title': 'This page can only be viewed by Admin',
  'pages.confirm.prefix': 'If confirmed, please enter the text',
  'pages.confirm.suffix':
    'in the following input box and click "Confirm" to continue the operation',
  'pages.confirm.text': 'Risk Accepted',

  'globalSearch.icon.tooltip': 'Global Search',
  'globalSearch.icon.landingGate': 'Go to Landing Page',
  'globalSearch.target.type': 'type',
  'globalSearch.target.name': 'Name',
  'globalSearch.target.info': 'Information',
  'globalSearch.targetType.page': 'page',
  'globalSearch.targetType.pages': 'Pages',
  'globalSearch.targetType.actions': 'Actions',
  'globalSearch.targetType.action': 'action',
  'globalSearch.targetType.resource': 'Resource',
  'globalSearch.pages.dashboard': 'dashboard - main board',
  'globalSearch.pages.adDomain': 'setting - system setting - AD domain setting',
  'globalSearch.pages.ldadDomain': 'setting - system setting - LDAP domain setting',
  'globalSearch.pages.nisDomain': 'setting - system setting - NISdomain setting',
  'globalSearch.pages.setCifs': 'setting - system setting - Configure CIFS Parameters',
  'globalSearch.pages.setFtp': 'setting - system setting - Configure FTP Parameters',
  'globalSearch.pages.setCluster': 'setting - system setting - Cluster Configuration',
  'globalSearch.pages.ipManage': 'setting - system setting - Service IP Pool Management',
  'globalSearch.pages.setDns': 'setting - system setting - DNS Configuration',
  'globalSearch.pages.licenseManage': 'setting - License Management',
  'globalSearch.pages.dataDisk': 'storage - resources - data disk',

  'globalSearch.pages.dir': 'directory Management',
  'globalSearch.pages.fileUser': 'user management',
  'globalSearch.pages.host': 'storage node',
  'globalSearch.pageName.dataDisk': 'data disk management',
  'globalSearch.pages.pool': 'storage pool',
  'globalSearch.pages.reGroup': 'resource group',
  'globalSearch.pages.objTenant': 'object storage tenant management',
  'globalSearch.pages.objUser': 'object storage user management',
  'globalSearch.pages.fileGroup': 'storage user group management',
  'globalSearch.pages.fileQuota': 'directory quota management',
  'globalSearch.pages.quotaManage': 'user / user group quota management',
  'globalSearch.pages.dirSnap': 'directory snapshot',
  'globalSearch.pages.bucket': 'object storage bucket management',
  'globalSearch.pages.gateway-router': 'object storage Gateway & HA Group management',
  'globalSearch.pages.loadBalance': 'Setting - System Management - Load Balancing strategy',
  'globalSearch.pages.repCluster': 'Protection - TerraReplication Cluster',
  'globalSearch.pages.objStoragePolicy': 'object storage ploicy',
  'globalSearch.pages.object_gateway': 'object storage gateway',

  'globalSearch.pages.object_search': 'object search',
  
  'globalSearch.pageName.curAlert': 'current alarm',
  'globalSearch.pageName.hisAlert': 'history alarm',
  'globalSearch.pageName.alertConfig': 'alert config',
  'globalSearch.pageName.pool': 'storage pool management',
  'globalSearch.pageName.reGroup': 'resource group management',
  'globalSearch.pageName.portalUser': 'portal user management',

  'globalSearch.actions.createDir': 'create directory',
  'globalSearch.actions.createShare': 'create share',
  'globalSearch.actions.createPool': 'create storage pool',
  'globalSearch.actions.createFileUser': 'create file storage user',
  'globalSearch.actions.createFileGroup': 'create file storage user group',
  'globalSearch.actions.createObjTenant': 'create object storage tenant',
  'globalSearch.actions.createObjUser': 'create object storage user',
  'globalSearch.actions.setBucketPolicy': 'Create bucket policy',
  'globalSearch.actions.setFileWorm': 'Set file WORM',
  'globalSearch.actions.createBucket': 'create bucket',
  'globalSearch.actions.createPortalUser': 'create portal user',
  'globalSearch.actions.setAlertConfig': 'set alarm config',
  'globalSearch.actions.setMailNotify': 'set mail alarm notification',
  'globalSearch.actions.setSnmpAlertNotify': 'set SNMPv3 alarm notification',
  'globalSearch.actions.setClusterConfig': 'set cluster notification',
  'globalSearch.actions.setBusinessIp': 'set service IP pool',
  'globalSearch.actions.setDnsConfig': 'set DNS config',
  'globalSearch.actions.setDirQuota': 'set directory quota',
  'globalSearch.actions.setDirQos': 'set directory QoS',
  'globalSearch.actions.setFileUserQuota': 'set user quota',
  'globalSearch.actions.setFileGroupQuota': 'set user group quota',
  'globalSearch.actions.setObjUserQuota': 'set object storage user quota',
  'globalSearch.actions.setBucketQuota': 'set bucket quota',
  'globalSearch.actions.setBucketMultiVersion': 'set bucket multi version',
  'globalSearch.actions.setBucketLc': 'set bucket lifecycle',
  'globalSearch.actions.setBucketACL': 'set bucket ACL',
  'globalSearch.actions.setBucketWorm': 'set bucket WORM',
  'globalSearch.actions.createGroupQuota': 'create user group quota',
  'globalSearch.actions.createUserQuota': 'create user quota',
  'globalSearch.actions.setAlertNotify': 'set alarm notification',
  'globalSearch.actions.createReGroup': 'create resource group',
  'globalSearch.actions.setLoadBalance': 'set load balance',
  'globalSearch.actions.repCluster': 'set terraReplication',
  'globalSearch.actions.setTerraTier': 'set terraTier',
  'globalSearch.actions.createMigrationPolicy': 'create migration policy',
  'globalSearch.actions.createPlacementPolicy': 'create placement policy',
  'globalSearch.actions.createObjStoragePolicy': 'create object storage policy',

  'globalSearch.resource.share_dir': 'share directory',
  'globalSearch.resource.storage_pool': 'storage pool',
  'globalSearch.resource.resource_group': 'resource group',
  'globalSearch.resource.host': 'node',
  'globalSearch.resource.file_user': 'storage user',
  'globalSearch.resource.file_group': 'user group',
  'globalSearch.resource.object_tenant': 'object storage tenant',
  'globalSearch.resource.object_user': 'object storage user',
  'globalSearch.resource.bucket': 'bucket',
  'globalSearch.resource.storage_policy': 'object storage policy',
  'globalSearch.resource.object_gateway': 'object storage gateway',

  'globalSearch.keys.capacity': 'capacity',
  'globalSearch.keys.systemDisk': 'system disk',
  'globalSearch.keys.dataDisk': 'data disk',
  'globalSearch.keys.client': 'client',
  'globalSearch.keys.mem': 'memory',
  'globalSearch.keys.cpu': 'CPU',
  'globalSearch.keys.health': 'health',
  'globalSearch.keys.bw': 'bandwidth',
  'globalSearch.keys.iops': 'IOPS',
  'globalSearch.keys.perf': 'performance',
  'globalSearch.keys.disk': 'disk',
  'globalSearch.keys.hardDisk': 'hard disk',

  'globalSearch.keys.ad': 'AD',
  'globalSearch.keys.domain': 'domain',
  'globalSearch.keys.dir': 'directory',
  'globalSearch.keys.path': 'path',
  'globalSearch.keys.dirWarning': 'folder alarm',
  'globalSearch.keys.alarm': 'alarm',
  'globalSearch.keys.alert': 'alert',
  'globalSearch.keys.warning': 'warning',
  'globalSearch.keys.event': 'event',
  'globalSearch.keys.pool': 'storage pool',
  'globalSearch.keys.reGroup': 'resource group',
  'globalSearch.keys.user': 'user',
  'globalSearch.keys.usergroup': 'user group',
  'globalSearch.keys.quota': 'quota',
  'globalSearch.keys.snap': 'snapshot',
  'globalSearch.keys.node': 'node',
  'globalSearch.keys.bucket': 'bucket',
  'globalSearch.keys.create': 'create',
  'globalSearch.keys.newAdd': 'newAdd',
  'globalSearch.keys.increase': 'add',
  'globalSearch.keys.add': 'increase',
  'globalSearch.keys.folder': 'folder',
  'globalSearch.keys.ldap': 'LDAP',
  'globalSearch.keys.nis': 'NIS',
  'globalSearch.keys.cifs': 'CIFS',
  'globalSearch.keys.ftp': 'FTP',
  'globalSearch.keys.clusterSet': 'cluster notification',
  'globalSearch.keys.timer': 'clock service',
  'globalSearch.keys.ipAddress': 'IP address',
  'globalSearch.keys.ip': 'IP',
  'globalSearch.keys.address': 'address',
  'globalSearch.keys.dns': 'DNS',
  'globalSearch.keys.domainName': 'doamin name',
  'globalSearch.keys.authentication': 'authentication',
  'globalSearch.keys.activity': 'activiate',
  'globalSearch.keys.enlicense': 'License',
  'globalSearch.keys.key': 'KEY',
  'globalSearch.keys.chlicense': 'license',
  'globalSearch.keys.set': 'set',
  'globalSearch.keys.config': 'config',
  'globalSearch.keys.tenant': 'tenant',
  'globalSearch.keys.loadBalance': 'load balance',
  'globalSearch.keys.replication': 'remote replication',
  'globalSearch.keys.protect': 'protect',
  'globalSearch.keys.repCluster': 'replication cluster',
  'globalSearch.keys.repShip': 'replication relationship',
  'globalSearch.keys.repPolicy': 'replication policy',
  'globalSearch.keys.placementPolicy': 'placement policy',
  'globalSearch.keys.migrationPolicy': 'migration policy',
  'globalSearch.keys.storagePolicy': 'storage policy',
  'globalSearch.keys.fileGroup': 'file storage user group',
  'globalSearch.keys.object_gateway': 'object storage gateway',
  'globalSearch.keys.gateway-router': 'object storage Gateway & HA Group management',

  'globalSearch.table.title': '{count} reault(s) for "{search}"',
  'globalSearch.result': 'Search Results',
  'globalSearch.noSearch': 'quick function entry',
  'globalSearch.placeholder': 'Search actions, pages and objects',
  'globalSearch.resource.file': 'share file',
  'globalSearch.info.bucket': 'Owner: {user}',
  'globalSearch.notFound': 'No Data',
  'globalSearch.more': '...More',
};
