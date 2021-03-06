import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: 'manage',
  linkActiveClass: 'active',
  linkExactActiveClass: 'exactActive',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['@#/Home'], resolve),
      meta: {
        requiresAuth: true,
        title: '首页',
        group: ['home', '', '']
      },
      children: [
        {
          path: 'home/taskdate',
          name: 'taskdate',
          component: resolve => require(['@#/TaskDate'], resolve),
          meta: {
            title: '日历', requiresAuth: true, group: ['home', 0, '']
          }
        },
        {
          path: 'home/payment',
          name: 'payment',
          component: resolve => require(['@#/Payment'], resolve),
          meta: {
            title: '在线支付', requiresAuth: true, group: ['home', 1, '']
          }
        },
        {
          path: 'home/user',
          name: 'userInfo',
          component: resolve => require(['@#/User'], resolve),
          meta: {
            title: '个人中心', requiresAuth: true, group: ['home', 2, '']
          }
        },
        {
          path: 'home/company',
          name: 'company',
          component: resolve => require(['@#/Company'], resolve),
          meta: {
            title: '我的企业', requiresAuth: true, group: ['home', 3, '']
          },
          children: [
            {
              path: 'authentic',
              name: 'CompanyAuth',
              component: resolve => require(['@#/CompanyAuth'], resolve),
              meta: {
                title: '实名认证', requiresAuth: true, group: ['home', 3, 0]
              }
            },
            {
              path: 'authDetail',
              name: 'authDetail',
              component: resolve => require(['@#/CompanyAuthDetail'], resolve),
              meta: {
                title: '认证信息', requiresAuth: true, group: ['home', 3, 1]
              }
            }
          ]
        },
        {
          path: 'home/workProcess',
          name: 'workProcess',
          component: resolve => require(['@#/WorkProcess'], resolve),
          meta: {
            title: '服务进度', requiresAuth: true, group: ['home', 4, '']
          }
        }
      ]
    },

    {
      path: '/Archives',
      name: 'Archives',
      component: resolve => require(['@#/archives/Index'], resolve),
      meta: {
        requiresAuth: true,
        group: ['student', '', '']
      },
      children: [
        {
          path: 'Student',
          name: 'Student',
          component: resolve => require(['@#/archives/student/Student'], resolve),
          meta: {
            requiresAuth: true,
            title: '学生管理',
            group: ['student', 0, '']
          },
          children: [
            {
              path: 'edit',
              name: 'edit',
              component: resolve => require(['@#/archives/student/Edit'], resolve),
              meta: {requiresAuth: true, title: '学生详情', group: ['student', 0, 0]}
            }
          ]
        },
        {
          path: 'student_seas',
          name: 'student_seas',
          component: resolve => require(['@#/archives/student_seas/Index'], resolve),
          meta: {
            requiresAuth: true,
            title: '学生公海',
            group: ['student', 1, '']
          },
          children: [
            {
              path: 'edit',
              name: 'studentSeasEdit',
              component: resolve => require(['@#/archives/student/Edit'], resolve),
              meta: {requiresAuth: true, title: '学生详情', group: ['student', 0, 0]}
            }
          ]
        },
        {
          path: 'student_statistics',
          name: 'student_statistics',
          component: resolve => require(['@#/archives/student_statistics/Index'], resolve),
          redirect: '/archives/student_statistics/type_statistics',
          meta: {
            requiresAuth: true,
            title: '统计分析',
            group: ['student', 2, '']
          },
          children: [
            {
              path: 'type_statistics',
              name: 'type_statistics',
              component: resolve => require(['@#/archives/student_statistics/Type_statistics'], resolve),
              meta: {
                requiresAuth: true,
                title: '学生类型统计',
                group: ['student', 2, 0]
              }
            }, {
              path: 'record_report',
              name: 'record_report',
              component: resolve => require(['@#/archives/student_statistics/Record_report'], resolve),
              meta: {
                requiresAuth: true,
                title: '跟进记录报表',
                group: ['student', 2, 1]
              }
            }
          ]
        }
      ]
    },

    {
      path: '/functions',
      name: 'functions',
      component: resolve => require(['@#/functions/Index'], resolve),
      meta: {
        title: '功能',
        requiresAuth: true,
        group: ['function', '', '']
      },
      children: [
        {
          path: 'schoollist',
          name: 'schoollist',
          component: resolve => require(['@#/functions/school/SchoolList'], resolve),
          meta: {
            title: '校查查',
            requiresAuth: true,
            group: ['function', 0, '']
          },
          children: [
            {
              path: 'scholldetail',
              name: 'scholldetail',
              component: resolve => require(['@#/functions/school/SchollDetail'], resolve),
              meta: {title: '学校详情', requiresAuth: true, group: ['function', 0, 0]},
              children: [
                {
                  path: 'benke',
                  name: 'benke',
                  component: resolve => require(['@#/functions/school/MajorDetailA'], resolve),
                  meta: {title: '本科专业', requiresAuth: true, group: ['function', 0, 1]}
                },
                {
                  path: 'shuoshi',
                  name: 'shuoshi',
                  component: resolve => require(['@#/functions/school/MajorDetailB'], resolve),
                  meta: {title: '硕士专业', requiresAuth: true, group: ['function', 0, 2]}
                },
                {
                  path: 'FoundationDetail',
                  name: 'FoundationDetail',
                  component: resolve => require(['@#/functions/school/FoundationDetail'], resolve),
                  meta: {title: '预科语言详情', requiresAuth: true, group: ['function', 0, 3]}
                }
              ]
            },
            {
              path: 'majordetaila',
              name: 'majordetaila',
              component: resolve => require(['@#/functions/school/MajorDetailA'], resolve),
              meta: {title: '本科专业', requiresAuth: true, group: ['function', 0, 1]}
            },
            {
              path: 'majordetailb',
              name: 'majordetailb',
              component: resolve => require(['@#/functions/school/MajorDetailB'], resolve),
              meta: {title: '硕士专业', requiresAuth: true, group: ['function', 0, 2]}
            }
          ]
        },
        {
          path: 'plan',
          name: 'plan',
          component: resolve => require(['@#/functions/plan/Index'], resolve),
          meta: {
            title: '留学规划',
            requiresAuth: true,
            group: ['function', 1, '']
          },
          children: [
            {
              path: 'view',
              name: 'view',
              component: resolve => require(['@#/functions/plan/View'], resolve),
              meta: {title: '留学规划详情', requiresAuth: true, group: ['function', 1, 0]}
            },
            {
              path: 'edit',
              name: 'plan-edit',
              component: resolve => require(['@#/functions/plan/Edit'], resolve),
              meta: {title: '编辑留学规划', requiresAuth: true, group: ['function', 1, 1]}
            }
          ]
        },
        {
          path: 'applyInfo',
          name: 'applyInfo',
          component: resolve => require(['@#/functions/applyInfo/Index'], resolve),
          meta: {
            title: '申请资料',
            requiresAuth: true,
            group: ['function', 2, '']
          },
          children: [
            {
              path: 'detail',
              name: 'applyInfoDetail',
              component: resolve => require(['@#/functions/applyInfo/detail'], resolve),
              meta: {
                title: '资料详情',
                requiresAuth: true,
                group: ['function', 2, 0]
              }
            },
            {
              path: 'family',
              name: 'family',
              component: resolve => require(['@#/functions/applyInfo/FamilyComponent'], resolve),
              meta: {
                title: '家庭信息',
                requiresAuth: true,
                group: ['function', 2, 1]
              }
            },
            {
              path: 'education',
              name: 'education',
              component: resolve => require(['@#/functions/applyInfo/Education'], resolve),
              meta: {
                title: '教育背景',
                requiresAuth: true,
                group: ['function', 2, 2]
              }
            },
            {
              path: 'exam',
              name: 'exam',
              component: resolve => require(['@#/functions/applyInfo/ExamComponent'], resolve),
              meta: {
                title: '考试成绩',
                requiresAuth: true,
                group: ['function', 2, 3]
              }
            },
            {
              path: 'applyType',
              name: 'applyType',
              component: resolve => require(['@#/functions/applyInfo/applyType'], resolve),
              meta: {
                title: '申请类型',
                requiresAuth: true,
                group: ['function', 2, 4]
              }
            }
          ]
        },
        {
          path: 'answer',
          name: 'answer',
          component: resolve => require(['@#/functions/answer/Index'], resolve),
          meta: {
            title: '文书作答',
            requiresAuth: true,
            group: ['function', 6, '']
          },
          children: [
            {
              path: 'addAnswer',
              name: 'addAnswer',
              component: resolve => require(['@#/functions/answer/AddAnswer'], resolve),
              meta: {
                title: '题目作答',
                requiresAuth: true,
                group: ['function', 6, 0]
              }
            },
            {
              path: 'addLetter',
              name: 'addLetter',
              component: resolve => require(['@#/functions/answer/AddLetter'], resolve),
              meta: {
                title: '文书作答',
                requiresAuth: true,
                group: ['function', 6, 1]
              }
            }
          ]
        },
        {
          path: 'initApply',
          name: 'initApply',
          component: resolve => require(['@#/functions/initApply/Index'], resolve),
          meta: {
            title: '发起申请',
            requiresAuth: true,
            group: ['function', 3, '']
          },
          children: [
            {
              path: 'ChooseSchool',
              name: 'ChooseSchool',
              component: resolve => require(['@#/functions/initApply/ChooseSchool'], resolve),
              meta: {
                title: '选择学校',
                requiresAuth: true,
                group: ['function', 3, 0]
              }
            },
            {
              path: 'UploadData',
              name: 'UploadData',
              component: resolve => require(['@#/functions/initApply/UploadData'], resolve),
              meta: {
                title: '上传材料',
                requiresAuth: true,
                group: ['function', 3, 1]
              }
            },
            {
              path: 'QuestionAnswer',
              name: 'QuestionAnswer',
              component: resolve => require(['@#/functions/initApply/QuestionAnswer'], resolve),
              meta: {
                title: '题目作答',
                requiresAuth: true,
                group: ['function', 3, 2]
              }
            },
            {
              path: 'ConfirmSubmission',
              name: 'ConfirmSubmission',
              component: resolve => require(['@#/functions/initApply/ConfirmSubmission'], resolve),
              meta: {
                title: '确认提交',
                requiresAuth: true,
                group: ['function', 3, 3]
              }
            }
          ]
        },
        {
          path: 'track',
          name: 'track',
          component: resolve => require(['@#/functions/track/Index'], resolve),
          meta: {
            title: '申请跟踪',
            requiresAuth: true,
            group: ['function', 4, '']
          }
        },
        {
          path: 'commission',
          name: 'commission',
          component: resolve => require(['@#/functions/commission/Index'], resolve),
          meta: {
            title: '佣金管理',
            requiresAuth: true,
            group: ['function', 5, '']
          },
          children: [
            {
              path: 'cumulative',
              name: 'cumulative',
              component: resolve => require(['@#/functions/commission/Cumulative'], resolve),
              meta: {title: '账单明细', requiresAuth: true, group: ['function', 5, 0]}
            },
            {
              path: 'estimate',
              name: 'estimate',
              component: resolve => require(['@#/functions/commission/Estimate'], resolve),
              meta: {title: '返佣明细', requiresAuth: true, group: ['function', 5, 1]}
            },
            {
              path: 'withdraw',
              name: 'withdraw',
              component: resolve => require(['@#/functions/commission/Withdraw'], resolve),
              meta: {title: '佣金提现', requiresAuth: true, group: ['function', 5, 2]}
            }
          ]
        }

      ]
    },

    {
      path: '/setting',
      name: 'setting',
      component: resolve => require(['@#/setting/Index'], resolve),
      meta: {
        title: '设置',
        requiresAuth: true,
        group: ['setting', '', '']
      },
      children: [
        {
          path: 'accounts',
          name: 'accounts',
          component: resolve => require(['@#/setting/accounts/Index'], resolve),
          meta: {
            requiresAuth: true,
            title: '帐号管理',
            group: ['setting', 0, '']
          },
          children: []
        },
        {
          path: 'rolePermit',
          name: 'rolePermit',
          component: resolve => require(['@#/setting/rolePermit/Index'], resolve),
          meta: {
            requiresAuth: true,
            title: '角色权限',
            group: ['setting', 1, '']
          },
          children: [
            {
              path: 'detail',
              name: 'rolePermitDetail',
              component: resolve => require(['@#/setting/rolePermit/Detail'], resolve),
              meta: {
                requiresAuth: true,
                title: '权限分配',
                group: ['setting', 1, 0]
              }
            }
          ]
        },
        {
          path: 'ability',
          name: 'ability',
          component: resolve => require(['@#/setting/ability/Ability'], resolve),
          meta: {
            requiresAuth: true,
            title: '能力考评',
            group: ['setting', 2, '']
          },
          children: [
            {
              path: 'addability',
              name: 'addability',
              component: resolve => require(['@#/setting/ability/AddAbility'], resolve),
              meta: {title: '添加能力考评', requiresAuth: true, group: ['setting', 2, 0]}
            },
            {
              path: 'editability',
              name: 'editability',
              component: resolve => require(['@#/setting/ability/EditAbility'], resolve),
              meta: {title: '编辑能力考评', requiresAuth: true, group: ['setting', 2, 1]}
            },
            {
              path: 'showability',
              name: 'showability',
              component: resolve => require(['@#/setting/ability/ShowAbility'], resolve),
              meta: {title: '能力考评详情', requiresAuth: true, group: ['setting', 2, 2]}
            }
          ]
        },
        {
          path: 'budget',
          name: 'budget',
          component: resolve => require(['@#/setting/budget/Index'], resolve),
          meta: {
            requiresAuth: true,
            title: '费用预算',
            group: ['setting', 3, '']
          },
          children: [
            {
              path: 'add',
              name: 'add-budget',
              component: resolve => require(['@#/setting/budget/Add'], resolve),
              meta: {title: '添加预算', requiresAuth: true, group: ['setting', 3, 0]}
            },
            {
              path: 'edit',
              name: 'edit-budget',
              component: resolve => require(['@#/setting/budget/Edit'], resolve),
              meta: {title: '编辑预算', requiresAuth: true, group: ['setting', 3, 1]}
            },
            {
              path: 'show',
              name: 'show-budget',
              component: resolve => require(['@#/setting/budget/Show'], resolve),
              meta: {title: '查看预算', requiresAuth: true, group: ['setting', 3, 2]}
            }
          ]
        },
        {
          path: 'student_type',
          name: 'stu_list',
          component: resolve => require(['@#/setting/student_type/list'], resolve),
          meta: {
            title: '学生类型',
            requiresAuth: true,
            group: ['setting', 4, '']
          },
          children: [
            {
              path: 'detail',
              name: 'stu_detail',
              component: resolve => require(['@#/setting/student_type/Detail'], resolve),
              meta: {
                title: '类型详情',
                requiresAuth: true,
                group: ['setting', 4, 0]
              }
            }
          ]
        },
        {
          path: 'follow',
          name: 'follow',
          component: resolve => require(['@#/setting/follow/List'], resolve),
          meta: {
            title: '跟进状态',
            requiresAuth: true,
            group: ['setting', 5, '']
          },
          children: [
            {
              path: 'detail',
              name: 'follow_detail',
              component: resolve => require(['@#/setting/follow/Detail'], resolve),
              meta: {
                title: '状态详情',
                requiresAuth: true,
                group: ['setting', 5, 0]
              }
            }
          ]
        },
        {
          path: 'message',
          name: 'message',
          component: resolve => require(['@#/setting/message/Index'], resolve),
          meta: {
            title: '公告通知',
            requiresAuth: true,
            group: ['setting', 6, '']
          },
          children: [
            {
              path: 'detail',
              name: 'messageDetail',
              component: resolve => require(['@#/setting/message/Detail'], resolve),
              meta: {
                title: '公告通知详情',
                requiresAuth: true,
                group: ['setting', 6, 0]
              }
            }
          ]
        },
        {
          path: 'contact',
          name: 'contact_list',
          component: resolve => require(['@#/setting/contact/List'], resolve),
          meta: {
            title: '联系人',
            requiresAuth: true,
            group: ['setting', 7, '']
          },
          children: [
            {
              path: 'detail',
              name: 'contact_detail',
              component: resolve => require(['@#/setting/contact/Detail'], resolve),
              meta: {
                title: '联系人详情',
                requiresAuth: true,
                group: ['setting', 7, 0]
              }
            }
          ]
        }
      ]
    },

    {
      path: '/marketing',
      name: 'marketing',
      component: resolve => require(['@#/marketing/Index'], resolve),
      meta: {
        requiresAuth: true,
        title: '市场',
        group: ['marketing', '', '']
      },
      children: [
        {
          path: 'saleslead',
          name: 'saleslead',
          component: resolve => require(['@#/marketing/saleslead/Index'], resolve),
          meta: {
            title: '渠道工具', requiresAuth: true, group: ['marketing', 0, '']
          },
          children: [
            {
              path: 'TentacleDetail',
              name: 'TentacleDetail',
              component: resolve => require(['@#/marketing/saleslead/TentacleDetail'], resolve),
              meta: {
                title: '渠道工具详情', requiresAuth: true, group: ['marketing', 0, 0]
              }
            }
          ]
        },
        {
          path: 'product',
          name: 'product',
          component: resolve => require(['@#/marketing/Product'], resolve),
          meta: {
            title: '产品管理', requiresAuth: true, group: ['marketing', 1, '']
          },
          children: [
            {
              path: 'detail',
              name: 'ProductDetail',
              component: resolve => require(['@#/marketing/ProductDetail'], resolve),
              meta: {
                title: '产品详情', requiresAuth: true, group: ['marketing', 0, 0]
              }
            }
          ]
        },
        {
          path: 'contract',
          name: 'contract',
          component: resolve => require(['@#/marketing/Contract'], resolve),
          meta: {
            title: '合同管理', requiresAuth: true, group: ['marketing', 2, '']
          },
          children: [
            {
              path: 'recording',
              name: 'contract-recording',
              component: resolve => require(['@#/marketing/Contaract-recor'], resolve),
              meta: {
                title: '合同管理', requiresAuth: true, group: ['marketing', 2, 0]
              }
            }
          ]
        },
        {
          path: 'OrderRecord',
          name: 'OrderRecord',
          component: resolve => require(['@#/marketing/OrderRecord'], resolve),
          meta: {
            title: '订单记录', requiresAuth: true, group: ['marketing', 3, '']
          }
        }
      ]
    },

    {
      path: '/admin',
      name: 'admin',
      component: resolve => (require(['@#/admin/AdminIndex'], resolve)),
      meta: {
        requiresAuth: true,
        title: '易申学',
        group: ['applyoversea', '', '']
      },
      children: [
        {
          path: 'commarrival',
          name: 'commarrival',
          component: resolve => require(['@#/admin/commarrival/Index'], resolve),
          meta: {
            title: '佣金到账',
            requiresAuth: true,
            group: ['applyoversea', 0, '']
          },
          children: [
            {
              path: 'arrival',
              name: 'arrival',
              component: resolve => require(['@#/admin/commarrival/Arrival'], resolve),
              meta: {title: '佣金到账详情', requiresAuth: true, group: ['applyoversea', 0, 0]}
            }
          ]
        },
        {
          path: 'commapply',
          name: 'commapply',
          component: resolve => require(['@#/admin/commapply/Index'], resolve),
          meta: {
            title: '佣金提现',
            requiresAuth: true,
            group: ['applyoversea', 1, '']
          },
          children: [
            {
              path: 'apply',
              name: 'apply',
              component: resolve => require(['@#/admin/commapply/Apply'], resolve),
              meta: {title: '佣金提现详情', requiresAuth: true, group: ['applyoversea', 1, 0]}
            }
          ]
        },
        {
          path: 'Agency',
          name: 'Agency',
          component: resolve => require(['@#/admin/agency/Agency'], resolve),
          meta: {
            requiresAuth: true,
            title: '中介机构',
            group: ['applyoversea', 2, '']
          },
          children: [
            {
              path: 'AddAgency',
              name: 'AddAgency',
              component: resolve => require(['@#/admin/agency/AddAgency'], resolve),
              meta: {title: '添加中介机构', requiresAuth: true, group: ['applyoversea', 2, 0]}
            },
            {
              path: 'EditAgency',
              name: 'EditAgency',
              component: resolve => require(['@#/admin/agency/EditAgency'], resolve),
              meta: {title: '编辑中介机构', requiresAuth: true, group: ['applyoversea', 2, 1]}
            },
            {
              path: 'ShowAgency',
              name: 'ShowAgency',
              component: resolve => require(['@#/admin/agency/ShowAgency'], resolve),
              meta: {title: '查看中介机构', requiresAuth: true, group: ['applyoversea', 2, 2]}
            }
          ]
        },
        {
          path: 'Bank',
          name: 'Bank',
          component: resolve => require(['@#/admin/bank/Bank'], resolve),
          meta: {
            requiresAuth: true,
            title: '银行档案',
            group: ['applyoversea', 3, '']
          },
          children: [
            {
              path: 'addbank',
              name: 'addbank',
              component: resolve => require(['@#/admin/bank/AddBank'], resolve),
              meta: {title: '添加档案', requiresAuth: true, group: ['applyoversea', 3, 0]}
            },
            {
              path: 'editbank',
              name: 'editbank',
              component: resolve => require(['@#/admin/bank/EditBank'], resolve),
              meta: {title: '编辑档案', requiresAuth: true, group: ['applyoversea', 3, 1]}
            },
            {
              path: 'showbank',
              name: 'showbank',
              component: resolve => require(['@#/admin/bank/ShowBank'], resolve),
              meta: {title: '查看档案', requiresAuth: true, group: ['applyoversea', 3, 2]}
            }
          ]
        },
        {
          path: 'user',
          name: 'user',
          component: resolve => require(['@#/admin/user/User'], resolve),
          meta: {
            requiresAuth: true,
            title: '操作用户',
            group: ['applyoversea', 4, '']
          },
          children: [
            {
              path: 'adduser',
              name: 'adduser',
              component: resolve => require(['@#/admin/user/AddUser'], resolve),
              meta: {title: '添加用户', requiresAuth: true, group: ['applyoversea', 4, 0]}
            },
            {
              path: 'edituser',
              name: 'edituser',
              component: resolve => require(['@#/admin/user/EditUser'], resolve),
              meta: {title: '编辑用户', requiresAuth: true, group: ['applyoversea', 4, 1]}
            },
            {
              path: 'showuser',
              name: 'showuser',
              component: resolve => require(['@#/admin/user/ShowUser'], resolve),
              meta: {title: '查看用户', requiresAuth: true, group: ['applyoversea', 4, 2]}
            }
          ]
        },
        {
          path: 'featRole',
          name: 'featRole',
          component: resolve => require(['@#/admin/featRole/index'], resolve),
          meta: {
            title: '功能角色',
            requiresAuth: true,
            group: ['applyoversea', 5, '']
          },
          children: [
            {
              path: 'detail',
              name: 'featRole-detail',
              component: resolve => require(['@#/admin/featRole/Detail'], resolve),
              meta: {title: '功能角色详情', requiresAuth: true, group: ['applyoversea', 5, 0]}
            }
          ]
        },
        {
          path: 'dataRole',
          name: 'dataRole',
          component: resolve => require(['@#/admin/dataRole/Index'], resolve),
          meta: {
            title: '数据角色',
            requiresAuth: true,
            group: ['applyoversea', 6, '']
          },
          children: [
            {
              path: 'detail',
              name: 'dataRole-detail',
              component: resolve => require(['@#/admin/dataRole/Detail'], resolve),
              meta: {title: '数据角色详情', requiresAuth: true, group: ['applyoversea', 6, 0]}
            }
          ]
        },
        {
          path: 'range',
          name: 'range',
          component: resolve => require(['@#/admin/range/Index'], resolve),
          meta: {
            title: '数据范围',
            requiresAuth: true,
            group: ['applyoversea', 7, '']
          },
          children: [
            {
              path: 'detail',
              name: 'range-detail',
              component: resolve => require(['@#/admin/range/Detail'], resolve),
              meta: {title: '数据范围详情', requiresAuth: true, group: ['applyoversea', 7, 0]}
            }
          ]
        },
        {
          path: 'message/list',
          name: 'message-list',
          component: resolve => require(['@#/admin/message/Index'], resolve),
          meta: {
            title: '公告列表',
            requiresAuth: true,
            group: ['applyoversea', 8, '']
          },
          children: [
            {
              path: 'detail',
              name: 'message-detail',
              component: resolve => require(['@#/admin/message/Detail'], resolve),
              meta: {
                title: '发布/编辑公告',
                requiresAuth: true,
                group: ['applyoversea', 8, 0]
              }
            }
          ]
        },
        {
          path: 'message/config',
          name: 'message-config',
          component: resolve => require(['@#/admin/message/Config'], resolve),
          meta: {
            title: '消息配置',
            requiresAuth: true,
            group: ['applyoversea', 9, '']
          },
          children: [
            {
              path: 'detail',
              name: 'message-config-detail',
              component: resolve => require(['@#/admin/message/ConfigDetail'], resolve),
              meta: {
                title: '消息配置详情',
                requiresAuth: true,
                group: ['applyoversea', 9, 0]
              }
            }
          ]
        },
        {
          path: 'application',
          name: 'application',
          component: resolve => require(['@#/admin/application/Index'], resolve),
          meta: {
            title: '院校申请',
            requiresAuth: true,
            group: ['applyoversea', 10, '']
          },
          children: [
            {
              path: 'Detail',
              name: 'application-Detail',
              component: resolve => require(['@#/admin/application/Detail'], resolve),
              meta: {
                title: '申请详情',
                requiresAuth: true,
                group: ['applyoversea', 10, 0]
              }
            }
          ]
        },
        {
          path: 'topic',
          name: 'topic',
          component: resolve => require(['@#/admin/Topic'], resolve),
          meta: {
            title: '题目更新',
            requiresAuth: true,
            group: ['applyoversea', 11, '']
          }
        },
        {
          path: 'payRecording',
          name: 'payRecording',
          component: resolve => require(['@#/admin/PayRecording'], resolve),
          meta: {
            title: '支付记录',
            requiresAuth: true,
            group: ['applyoversea', 12, '']
          }
        },
        {
          path: 'authReview',
          name: 'authReview',
          component: resolve => require(['@#/admin/AuthReview'], resolve),
          meta: {
            title: '认证审核',
            requiresAuth: true,
            group: ['applyoversea', 13, '']
          },
          children: [
            {
              path: 'detail',
              name: 'authReviewDetail',
              component: resolve => require(['@#/admin/authReviewDetail'], resolve),
              meta: {
                title: '审核详情',
                requiresAuth: true,
                group: ['applyoversea', 13, 0]
              }
            }
          ]
        },
        {
          path: 'agreement',
          name: 'agreement',
          component: resolve => require(['@#/admin/Agreement'], resolve),
          meta: {
            title: '服务协议',
            requiresAuth: true,
            group: ['applyoversea', 14, '']
          },
          children: [
            {
              path: 'detail',
              name: 'agreementDetail',
              component: resolve => require(['@#/admin/AgreementDetail'], resolve),
              meta: {
                title: '审核详情',
                requiresAuth: true,
                group: ['applyoversea', 14, 0]
              }
            }
          ]
        }
      ]
    },

    {
      path: '*', name: 'Error', component: resolve => require(['@#/Error'], resolve)
    }
  ]
})
