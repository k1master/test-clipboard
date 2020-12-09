export const mockData = {
  'default': {
    'search': '',
    'sort': {}
  },
  'search': {
    'search': 'center',
    'sort': {}
  },
  'sortWithAsc': {
    'search': '',
    'sort': {
      'job_title': 'asc'
    }
  },
  'sortWithDesc': {
    'search': '',
    'sort': {
      'job_title': 'desc'
    }
  },
  'multipleSort': {
    'search': '',
    'sort': {
      'job_title': 'asc',
      'created': 'asc'
    }
  },
  'multipleSortWithSearch': {
    'search': 'center',
    'sort': {
      'job_title': 'asc',
      'created': 'asc'
    }
  }
}