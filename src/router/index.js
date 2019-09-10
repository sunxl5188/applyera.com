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
      component: resolve => require(['@/components/Home'], resolve),
      meta: {
        requiresAuth: true,
        title: '首页',
        group: ['home', '', '']
      },
      children: [
        {
          path: 'home/taskdate',
          name: 'taskdate',
          component: resolve => require(['@/components/TaskDate'], resolve),
          meta: {
            title: '日历', requiresAuth: true, group: ['home', 0, '']
          }
        },
        {
          path: 'home/payment',
          name: 'payment',
          component: resolve => require(['@/components/Payment'], resolve),
          meta: {
            title: '在线支付', requiresAuth: true, group: ['home', 1, '']
          }
        },
        {
          path: 'home/user',
          name: 'userInfo',
          component: resolve => require(['@/components/User'], resolve),
          meta: {
            title: '个人中心', requiresAuth: true, group: ['home', 2, '']
          }
        },
        {
          path: 'home/enterprise',
          name: 'enterprise',
          component: resolve => require(['@/components/Enterprise'], resolve),
          meta: {
            title: '我的企业', requiresAuth: true, group: ['home', 3, '']
          }
        },
        {
          path: 'home/imagecropper',
          name: 'imagecropper',
          component: resolve => require(['@/components/ImageCropper'], resolve),
          meta: {
            title: '我的企业', requiresAuth: true, group: ['home', 4, '']
          }
        },
        {
          path: 'home/workProcess',
          name: 'workProcess',
          component: resolve => require(['@/components/WorkProcess'], resolve),
          meta: {
            title: '工作流', requiresAuth: true, group: ['home', 5, '']
          }
        }
      ]
    },

    {
      path: '/Archives',
      name: 'Archives',
      component: resolve => require(['@/components/archives/Index'], resolve),
      meta: {
        requiresAuth: true,
        group: ['student', '', '']
      },
      children: [
        {
          path: 'Student',
          name: 'Student',
          component: resolve => require(['@/components/archives/student/Student'], resolve),
          meta: {
            requiresAuth: true,
            title: '学生管理',
            group: ['student', 0, '']
          },
          children: [
            {
              path: 'edit',
              name: 'edit',
              component: resolve => require(['@/components/archives/student/Edit'], resolve),
              meta: {requiresAuth: true, title: '学生详情', group: ['student', 0, 0]}
            }
          ]
        },
        {
          path: 'student_seas',
          name: 'student_seas',
          component: resolve => require(['@/components/archives/student_seas/Index'], resolve),
          meta: {
            requiresAuth: true,
            title: '学生公海',
            group: ['student', 1, '']
          },
          children: [
            {
              path: 'edit',
              name: 'studentSeasEdit',
              component: resolve => require(['@/components/archives/student/Edit'], resolve),
              meta: {requiresAuth: true, title: '学生详情', group: ['student', 0, 0]}
            }
          ]
        },
        {
          path: 'student_statistics',
          name: 'student_statistics',
          component: resolve => require(['@/components/archives/student_statistics/Index'], resolve),
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
              component: resolve => require(['@/components/archives/student_statistics/Type_statistics'], resolve),
              meta: {
                requiresAuth: true,
                title: '学生类型统计',
                group: ['student', 2, 0]
              }
            }, {
              path: 'record_report',
              name: 'record_report',
              component: resolve => require(['@/components/archives/student_statistics/Record_report'], resolve),
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
      component: resolve => require(['@/components/functions/Index'], resolve),
      meta: {
        title: '功能',
        requiresAuth: true,
        group: ['function', '', '']
      },
      children: [
        {
          path: 'schoollist',
          name: 'schoollist',
          component: resolve => require(['@/components/functions/school/SchoolList'], resolve),
          meta: {
            title: '校查查',
            requiresAuth: true,
            group: ['function', 0, '']
          },
          children: [
            {
              path: 'scholldetail',
              name: 'scholldetail',
              component: resolve => require(['@/components/functions/school/SchollDetail'], resolve),
              meta: {title: '学校详情', requiresAuth: true, group: ['function', 0, 0]}
            },
            {
              path: 'majordetaila',
              name: 'majordetaila',
              component: resolve => require(['@/components/functions/school/MajorDetailA'], resolve),
              meta: {title: '本科专业', requiresAuth: true, group: ['function', 0, 1]}
            },
            {
              path: 'majordetailb',
              name: 'majordetailb',
              component: resolve => require(['@/components/functions/school/MajorDetailB'], resolve),
              meta: {title: '硕士专业', requiresAuth: true, group: ['function', 0, 2]}
            }
          ]
        },
        {
          path: 'plan',
          name: 'plan',
          component: resolve => require(['@/components/functions/plan/Index'], resolve),
          meta: {
            title: '留学规划',
            requiresAuth: true,
            group: ['function', 1, '']
          },
          children: [
            {
              path: 'view',
              name: 'view',
              component: resolve => require(['@/components/functions/plan/View'], resolve),
              meta: {title: '留学规划详情', requiresAuth: true, group: ['function', 1, 0]}
            },
            {
              path: 'edit',
              name: 'plan-edit',
              component: resolve => require(['@/components/functions/plan/Edit'], resolve),
              meta: {title: '编辑留学规划', requiresAuth: true, group: ['function', 1, 1]}
            }
          ]
        },
        {
          path: 'applyInfo',
          name: 'applyInfo',
          component: resolve => require(['@/components/functions/applyInfo/Index'], resolve),
          meta: {
            title: '申请资料',
            requiresAuth: true,
            group: ['function', 2, '']
          },
          children: [
            {
              path: 'detail',
              name: 'applyInfo-info',
              component: resolve => require(['@/components/functions/applyInfo/detail'], resolve),
              meta: {
                title: '资料详情',
                requiresAuth: true,
                group: ['function', 2, 0]
              }
            }
          ]
        },
        {
          path: 'initApply',
          name: 'initApply',
          component: resolve => require(['@/components/functions/initApply/Index'], resolve),
          meta: {
            title: '发起申请',
            requiresAuth: true,
            group: ['function', 3, '']
          },
          children: [
            {
              path: 'add',
              name: 'add-initApply',
              component: resolve => require(['@/components/functions/initApply/Add'], resolve),
              meta: {
                title: '申请详情',
                requiresAuth: true,
                group: ['function', 3, 0]
              }
            }
          ]
        },
        {
          path: 'track',
          name: 'track',
          component: resolve => require(['@/components/functions/track/Index'], resolve),
          meta: {
            title: '申请跟踪',
            requiresAuth: true,
            group: ['function', 4, '']
          }
        },
        {
          path: 'commission',
          name: 'commission',
          component: resolve => require(['@/components/functions/commission/Index'], resolve),
          meta: {
            title: '佣金管理',
            requiresAuth: true,
            group: ['function', 5, '']
          },
          children: [
            {
              path: 'cumulative',
              name: 'cumulative',
              component: resolve => require(['@/components/functions/commission/Cumulative'], resolve),
              meta: {title: '账单明细', requiresAuth: true, group: ['function', 5, 0]}
            },
            {
              path: 'estimate',
              name: 'estimate',
              component: resolve => require(['@/components/functions/commission/Estimate'], resolve),
              meta: {title: '返佣明细', requiresAuth: true, group: ['function', 5, 1]}
            },
            {
              path: 'withdraw',
              name: 'withdraw',
              component: resolve => require(['@/components/functions/commission/Withdraw'], resolve),
              meta: {title: '佣金提现', requiresAuth: true, group: ['function', 5, 2]}
            }
          ]
        }

      ]
    },

    {
      path: '/setting',
      name: 'setting',
      component: resolve => require(['@/components/setting/Index'], resolve),
      meta: {
        title: '设置',
        requiresAuth: true,
        group: ['setting', '', '']
      },
      children: [
        {
          path: 'accounts',
          name: 'accounts',
          component: resolve => require(['@/components/setting/accounts/Index'], resolve),
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
          component: resolve => require(['@/components/setting/rolePermit/Index'], resolve),
          meta: {
            requiresAuth: true,
            title: '角色权限',
            group: ['setting', 1, '']
          },
          children: [
            {
              path: 'detail',
              name: 'rolePermitDetail',
              component: resolve => require(['@/components/setting/rolePermit/Detail'], resolve),
              meta: {
                requiresAuth: true,
                title: '角色编辑',
                group: ['setting', 1, 0]
              }
            }
          ]
        },
        {
          path: 'ability',
          name: 'ability',
          component: resolve => require(['@/components/setting/ability/Ability'], resolve),
          meta: {
            requiresAuth: true,
            title: '能力考评',
            group: ['setting', 2, '']
          },
          children: [
            {
              path: 'addability',
              name: 'addability',
              component: resolve => require(['@/components/setting/ability/AddAbility'], resolve),
              meta: {title: '添加能力考评', requiresAuth: true, group: ['setting', 2, 0]}
            },
            {
              path: 'editability',
              name: 'editability',
              component: resolve => require(['@/components/setting/ability/EditAbility'], resolve),
              meta: {title: '编辑能力考评', requiresAuth: true, group: ['setting', 2, 1]}
            },
            {
              path: 'showability',
              name: 'showability',
              component: resolve => require(['@/components/setting/ability/ShowAbility'], resolve),
              meta: {title: '查看能力考评', requiresAuth: true, group: ['setting', 2, 2]}
            }
          ]
        },
        {
          path: 'budget',
          name: 'budget',
          component: resolve => require(['@/components/setting/budget/Index'], resolve),
          meta: {
            requiresAuth: true,
            title: '费用预算',
            group: ['setting', 3, '']
          },
          children: [
            {
              path: 'add',
              name: 'add-budget',
              component: resolve => require(['@/components/setting/budget/Add'], resolve),
              meta: {title: '添加预算', requiresAuth: true, group: ['setting', 3, 0]}
            },
            {
              path: 'edit',
              name: 'edit-budget',
              component: resolve => require(['@/components/setting/budget/Edit'], resolve),
              meta: {title: '编辑预算', requiresAuth: true, group: ['setting', 3, 1]}
            },
            {
              path: 'show',
              name: 'show-budget',
              component: resolve => require(['@/components/setting/budget/Show'], resolve),
              meta: {title: '查看预算', requiresAuth: true, group: ['setting', 3, 2]}
            }
          ]
        },
        {
          path: 'student_type',
          name: 'stu_list',
          component: resolve => require(['@/components/setting/student_type/list'], resolve),
          meta: {
            title: '学生类型',
            requiresAuth: true,
            group: ['setting', 4, '']
          },
          children: [
            {
              path: 'detail',
              name: 'stu_detail',
              component: resolve => require(['@/components/setting/student_type/Detail'], resolve),
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
          component: resolve => require(['@/components/setting/follow/List'], resolve),
          meta: {
            title: '跟进状态',
            requiresAuth: true,
            group: ['setting', 5, '']
          },
          children: [
            {
              path: 'detail',
              name: 'follow_detail',
              component: resolve => require(['@/components/setting/follow/Detail'], resolve),
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
          component: resolve => require(['@/components/setting/message/Index'], resolve),
          meta: {
            title: '公告通知',
            requiresAuth: true,
            group: ['setting', 6, '']
          },
          children: [
            {
              path: 'detail',
              name: 'messageDetail',
              component: resolve => require(['@/components/setting/message/Detail'], resolve),
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
          component: resolve => require(['@/components/setting/contact/List'], resolve),
          meta: {
            title: '联系人',
            requiresAuth: true,
            group: ['setting', 7, '']
          },
          children: [
            {
              path: 'detail',
              name: 'contact_detail',
              component: resolve => require(['@/components/setting/contact/Detail'], resolve),
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
      path: '/admin',
      name: 'admin',
      component: resolve => (require(['@/components/admin/AdminIndex'], resolve)),
      meta: {
        requiresAuth: true,
        title: '易申学',
        group: ['applyoversea', '', '']
      },
      children: [
        {
          path: 'commarrival',
          name: 'commarrival',
          component: resolve => require(['@/components/admin/commarrival/Index'], resolve),
          meta: {
            title: '佣金到账',
            requiresAuth: true,
            group: ['applyoversea', 0, '']
          },
          children: [
            {
              path: 'arrival',
              name: 'arrival',
              component: resolve => require(['@/components/admin/commarrival/Arrival'], resolve),
              meta: {title: '佣金到账详情', requiresAuth: true, group: ['applyoversea', 0, 0]}
            }
          ]
        },
        {
          path: 'commapply',
          name: 'commapply',
          component: resolve => require(['@/components/admin/commapply/Index'], resolve),
          meta: {
            title: '佣金提现',
            requiresAuth: true,
            group: ['applyoversea', 1, '']
          },
          children: [
            {
              path: 'apply',
              name: 'apply',
              component: resolve => require(['@/components/admin/commapply/Apply'], resolve),
              meta: {title: '佣金提现详情', requiresAuth: true, group: ['applyoversea', 1, 0]}
            }
          ]
        },
        {
          path: 'Agency',
          name: 'Agency',
          component: resolve => require(['@/components/admin/agency/Agency'], resolve),
          meta: {
            requiresAuth: true,
            title: '中介机构',
            group: ['applyoversea', 2, '']
          },
          children: [
            {
              path: 'AddAgency',
              name: 'AddAgency',
              component: resolve => require(['@/components/admin/agency/AddAgency'], resolve),
              meta: {title: '添加中介机构', requiresAuth: true, group: ['applyoversea', 2, 0]}
            },
            {
              path: 'EditAgency',
              name: 'EditAgency',
              component: resolve => require(['@/components/admin/agency/EditAgency'], resolve),
              meta: {title: '编辑中介机构', requiresAuth: true, group: ['applyoversea', 2, 1]}
            },
            {
              path: 'ShowAgency',
              name: 'ShowAgency',
              component: resolve => require(['@/components/admin/agency/ShowAgency'], resolve),
              meta: {title: '查看中介机构', requiresAuth: true, group: ['applyoversea', 2, 2]}
            }
          ]
        },
        {
          path: 'Bank',
          name: 'Bank',
          component: resolve => require(['@/components/admin/bank/Bank'], resolve),
          meta: {
            requiresAuth: true,
            title: '银行档案',
            group: ['applyoversea', 3, '']
          },
          children: [
            {
              path: 'addbank',
              name: 'addbank',
              component: resolve => require(['@/components/admin/bank/AddBank'], resolve),
              meta: {title: '添加档案', requiresAuth: true, group: ['applyoversea', 3, 0]}
            },
            {
              path: 'editbank',
              name: 'editbank',
              component: resolve => require(['@/components/admin/bank/EditBank'], resolve),
              meta: {title: '编辑档案', requiresAuth: true, group: ['applyoversea', 3, 1]}
            },
            {
              path: 'showbank',
              name: 'showbank',
              component: resolve => require(['@/components/admin/bank/ShowBank'], resolve),
              meta: {title: '查看档案', requiresAuth: true, group: ['applyoversea', 3, 2]}
            }
          ]
        },
        {
          path: 'user',
          name: 'user',
          component: resolve => require(['@/components/admin/user/User'], resolve),
          meta: {
            requiresAuth: true,
            title: '操作用户',
            group: ['applyoversea', 4, '']
          },
          children: [
            {
              path: 'adduser',
              name: 'adduser',
              component: resolve => require(['@/components/admin/user/AddUser'], resolve),
              meta: {title: '添加用户', requiresAuth: true, group: ['applyoversea', 4, 0]}
            },
            {
              path: 'edituser',
              name: 'edituser',
              component: resolve => require(['@/components/admin/user/EditUser'], resolve),
              meta: {title: '编辑用户', requiresAuth: true, group: ['applyoversea', 4, 1]}
            },
            {
              path: 'showuser',
              name: 'showuser',
              component: resolve => require(['@/components/admin/user/ShowUser'], resolve),
              meta: {title: '查看用户', requiresAuth: true, group: ['applyoversea', 4, 2]}
            }
          ]
        },
        {
          path: 'featRole',
          name: 'featRole',
          component: resolve => require(['@/components/admin/featRole/index'], resolve),
          meta: {
            title: '功能角色',
            requiresAuth: true,
            group: ['applyoversea', 5, '']
          },
          children: [
            {
              path: 'detail',
              name: 'featRole-detail',
              component: resolve => require(['@/components/admin/featRole/Detail'], resolve),
              meta: {title: '功能角色详情', requiresAuth: true, group: ['applyoversea', 5, 0]}
            }
          ]
        },
        {
          path: 'dataRole',
          name: 'dataRole',
          component: resolve => require(['@/components/admin/dataRole/Index'], resolve),
          meta: {
            title: '数据角色',
            requiresAuth: true,
            group: ['applyoversea', 6, '']
          },
          children: [
            {
              path: 'detail',
              name: 'dataRole-detail',
              component: resolve => require(['@/components/admin/dataRole/Detail'], resolve),
              meta: {title: '数据角色详情', requiresAuth: true, group: ['applyoversea', 6, 0]}
            }
          ]
        },
        {
          path: 'range',
          name: 'range',
          component: resolve => require(['@/components/admin/range/Index'], resolve),
          meta: {
            title: '数据范围',
            requiresAuth: true,
            group: ['applyoversea', 7, '']
          },
          children: [
            {
              path: 'detail',
              name: 'range-detail',
              component: resolve => require(['@/components/admin/range/Detail'], resolve),
              meta: {title: '数据范围详情', requiresAuth: true, group: ['applyoversea', 7, 0]}
            }
          ]
        },
        {
          path: 'message/list',
          name: 'message-list',
          component: resolve => require(['@/components/admin/message/Index'], resolve),
          meta: {
            title: '公告列表',
            requiresAuth: true,
            group: ['applyoversea', 8, '']
          },
          children: [
            {
              path: 'detail',
              name: 'message-detail',
              component: resolve => require(['@/components/admin/message/Detail'], resolve),
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
          component: resolve => require(['@/components/admin/message/Config'], resolve),
          meta: {
            title: '消息配置',
            requiresAuth: true,
            group: ['applyoversea', 9, '']
          },
          children: [
            {
              path: 'detail',
              name: 'message-config-detail',
              component: resolve => require(['@/components/admin/message/ConfigDetail'], resolve),
              meta: {
                title: '消息配置详情',
                requiresAuth: true,
                group: ['applyoversea', 9, 0]
              }
            }
          ]
        }
      ]
    },

    {
      path: '*', name: 'Error', component: resolve => require(['@/components/Error'], resolve)
    }
  ]
})
