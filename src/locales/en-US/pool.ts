export default {
  'storage.pool.state': 'State',
  'storage.pool.creating': 'Creating',
  'storage.pool.created': 'Created',
  'storage.pool.deleting': 'Deleting',
  'storage.pool.fail': 'Fail',
  'storage.pool.purpose': 'Purpose',
  'storage.pool.use': 'Storage pool use',
  'storage.pool.systemPool': 'System pool',
  'storage.pool.fileMetaData': 'File metadata pool',
  'storage.pool.fileData': 'File capacity pool',
  'storage.pool.objectMetaData': 'Object metadata pool',
  'storage.pool.objectData': 'Object data pool',
  'storage.pool.objectCache': 'Object cache pool',
  'storage.pool.objectIndex': 'Object index pool',
  'storage.pool.filePerformance': 'File performance pool',
  'storage.pool.standard': 'Standard pool',
  'storage.pool': 'Storage Pools',
  'storage.pool.explain':
    'A storage pool is a logical partition of the cluster used to store data. Storage pools define data security strategies (replicas and EC) and distribution policies.',
  'storage.pool.alarm': 'Alarm',
  'storage.pool.resourceGroup': 'Resource Group',
  'storage.pool.virtualStorageGroups': 'Virtual Storage Groups',
  'storage.pool.dataSecurityPolicy': 'Security Policy',
  'storage.pool.capacity': 'Capacity',
  'storage.pool.performance': 'Performance',
  'storage.pool.health': 'Health',
  'storage.pool.info': 'Info',
  'storage.pool.warning': 'Warning',
  'storage.pool.minor': 'Minor',
  'storage.pool.major': 'Major',
  'storage.pool.critical': 'Critical',
  'storage.pool.copyText': '{size} Replica(s), {min} MinReplica(s)',
  'storage.pool.erasure': '{size} + {min} Erasure Coding',
  'storage.pool.searchTip': 'Please input storage pool name to search',
  'storage.pool.preview': 'Overview',
  'storage.pool.healthStatus': 'Health Status',
  'storage.pool.healthPool': 'The storage pool is healthy',
  'storage.pool.basicInformation': 'Basic Information',
  'storage.pool.createTime': 'Create Time',
  'storage.pool.quota': 'Quota',
  'storage.pool.capacityUsage': 'Capacity Usage',
  'storage.pool.used': 'Used',
  'storage.pool.usable': 'Usable',
  'storage.pool.capacityPredict': 'Available Capacity',
  'storage.pool.capacityTotal': 'Total Capacity',
  'storage.pool.capacityUsed': 'Used Capacity',
  'storage.pool.threshold': 'Threshold：{thresholdData}%',
  'storage.pool.serviceType': 'Service Type',
  'storage.pool.restructureDataVolume': 'Restructure Data Volume',
  'storage.pool.bandwidth': 'Bandwidth',
  'storage.pool.copy': 'Replica',
  'storage.pool.EC': 'EC',
  'storage.pool.resource': 'Resource Group',
  'storage.pool.poolName': 'Name',
  'storage.pool.securityPolicy': 'Security Policy',
  'storage.pool.copies': 'Replicas',
  'storage.pool.minimumCopies': 'MinReplicas',
  'storage.pool.file': 'File',
  'storage.pool.object': 'Object',
  'storage.pool.erasureCorrecting': 'Erasure Coding',
  'storage.pool.storagePoolCapacityQuota': 'Capacity Quota',
  'storage.pool.storagePoolCapacityQuota.notRequire':
    'The storage pool belonging to this resource group does not allow quota setting',
  'storage.pool.storagePoolAvailableCapacityEstimate': 'Estimated Available Capacity',
  'storage.pool.dataDlock': 'Data Blocks',
  'storage.pool.checkBlock': 'Parity Blocks',
  'storage.pool.shardSize': 'Slice Size',
  'storage.pool.newPool': 'Create Storage Pool',
  'storage.pool.faultDomain': 'Fault Domain: ',
  'storage.pool.node': 'Node: {nodes}',
  'storage.pool.dataDsik': 'Data Dsik: {data} ({type})',
  'storage.pool.enterResource': 'Please enter a resource group',
  'storage.pool.enterDataDlock': 'Is greater than 1 and can only be positive integers',
  'storage.pool.enterCheckBlock': 'It is not empty and can only be positive integers',
  'storage.pool.enterCopy':
    'Enter a positive integer that is greater than or equal to the minimum number of copies',
  'storage.pool.enterMinimumCopies':
    'The input value must be a positive integer and less than or equal to the number of copies',
  'storage.pool.enterPoolName': 'Please enter a storage pool name',
  'storage.pool.enterPoolNameErr':
    'It starts with a letter or a number, and can only contain numbers, letters, "-", "", Length less than 128',
  'storage.pool.availTip': 'Insufficient capacity available for storage pool',
  'storage.pool.usedTip': 'The capacity usage of storage pool exceeding threshold',
  'storage.pool.deleteTip': 'The storage pool cannot be deleted',
  'storage.pool.dataDlockTip': 'Data blocks(N): number of data slices',
  'storage.pool.checkBlockTip':
    'Parity blocks (M): check the number of data. It can tolerate up to m nodes to be damaged at the same time without causing data loss',
  'storage.pool.virtualStorageGroupsTip':
    'The number of carriers to place objects. The creation of a virtual storage group is specified by the system when creating a storage pool to achieve data balancing and protection policies',
  'storage.pool.drawerSubTitle': 'Created on ',
  'storage.pool.ecfold.required': 'Please select a security strategy',
  'storage.pool.ecfold.customize': 'customize',
  'storage.pool.ecfold.N': 'Data block',
  'storage.pool.ecfold.N.tips': 'Number of slices of data',
  'storage.pool.ecfold.M': 'Check block',
  'storage.pool.ecfold.M.tips':
    'Refers to the number of verification data, allowing any M disks to be damaged at the same time, while the data is in normal use',
  'storage.pool.ecfold.b.tips':
    'Allow at most b physical nodes to be broken at the same time, while the data is in normal use',
  'storage.pool.ecfold.minum': 'Minimum number of nodes',
  'storage.pool.ecfold.minum.tips':
    'The basic requirements for the number of nodes required by the EC strategy',
  'strorage.charts.legend.down_bandwidth': 'Receive',
  'strorage.charts.legend.up_bandwidth': 'Send',
  'strorage.charts.legend.lost': 'Lost',
  'strorage.charts.legend.delay_time': 'Latency',
  'pool.delete.confirm.content':
    "Deleting the storage pool will remove all the data permanently and can't restore them, Are you sure to delete this storage pool?",
  'storage.pool.blockNumRule': 'The data protection policy is not supported',
  'pool.create.wait_for.tips':
    'The create storage pool task has been submitted and is being executed in the background',
  'storage.pool.ECcreat.required': 'This item is required',
  'storage.pool.ECcreat.strategyRule':
    'The current cluster does not support this data protection policy, please re-enter',
  'storage.pool.ECcreat.strategyRule.required': 'Data block and check block values are required',
  'storage.pool.ECcreat.strategyRule.dataBlock':
    'The data block value is an integer greater than 1',
  'storage.pool.ECcreat.strategyRule.checkBlock':
    'The check block value is an integer greater than 1',
  'storage.pool.policyResult.tip':
    '{faultDomainNum} {faultDomain} failure(s) are allowed without data loss, and disk usage reaches  {rateNum} ',
  'storage.pool.poolDeleteTip': 'Deleting storage pool...',
  'storage.pool.create.quota.ruleErr': 'Please enter storage pool capacity quota',
  'storage.pool.create.quota.ruleErr2':
    'The capacity quota of a storage pool exceeds the upper limit. Procedure',
  'storage.pool.create.shardSize.ruleErr': 'The size of a group exceeds the upper limit. Procedure',
  'storage.pool.create.shard.ruleErr': 'The fragment size must be an integer multiple of 8KB',

  'storage.pool.capacity.content': '{usedWithUnit} Used|{availableWithUnit} Available',
  'storage.pool.resGroup.maxPoolNum.err':
    'The number of storage pools under this resource group has reached its maximum limit',
};
