app.service('Utils', function ($q, $http, $uibModal) {
  this.handleError = function (err) {
    console.error('This Error has occured', err);
  };

  this.camelizeString = function (inStr) {
    var str = inStr.replace(/[_-]/g, ' '),
      result = [];
    str = str.split(' ');
    str.forEach(function (s) {
      result.push(s[0].toUpperCase() + s.substr(1));
    });
    result = result.join(' ');
    return result;
  };

  this.removeLastWord = function (str) {
    var res = str.split(' ');
    res.pop();
    return res.join(' ');
  };

  this.createDate = function (dtObj) {
    if (!dtObj) {
      return '';
    }
    var result = new Date(dtObj);
    // result.setFullYear(dtObj.year);
    // result.setMonth(dtObj.monthValue);
    // result.setDate(dtObj.dayOfMonth);

    return result;
  };

  this.epochTime = function (dateString) {
    //console.log("dateString: " + dateString);
    var parts = dateString.match(/(\d{2})\-(\d{2})\-(\d{4})/);
    //console.log("parts: " + parts);
    return Date.UTC(+parts[3], parts[1] - 1, +parts[2]);
  };

  this.normalDate = function (epoch, dateFormat) {
    var shortMonths = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split(
      '_'
    );
    var longMonths = 'January_Febrary_March_April_May_June_July_August_September_Octeber_November_December'.split(
      '_'
    );

    var shortDays = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    var longDays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
      '_'
    );

    var _df = dateFormat;

    // convert epoch date to date object
    var dt = new Date(epoch);

    var date = dt.getDate(),
      month = dt.getMonth(),
      year = dt.getFullYear(),
      day = dt.getDay(),
      hour = dt.getHours(),
      mins = dt.getMinutes(),
      secs = dt.getSeconds();

    // year
    if (_df && _df.indexOf('yyyy') != -1) {
      _df = _df.replace('yyyy', year);
    }

    // day of week in long format e.g. Monday
    if (_df && _df.indexOf('DDDD') != -1) {
      _df = _df.replace('DDDD', longDays[day]);
    }

    // day of week in short format e.g. Mon
    if (_df && _df.indexOf('DDD') != -1) {
      _df = _df.replace('DDD', shortDays[day]);
    }

    // date of the month
    if (_df && _df.indexOf('dd') != -1) {
      _df = _df.replace('dd', date < 10 ? '0' + date : date);
    }

    // Month of the year in long format e.g. January
    if (_df && _df.indexOf('MMMM') != -1) {
      _df = _df.replace('MMMM', longMonths[month]);
    }

    // Month of the year in short format e.g. Jan
    if (_df && _df.indexOf('MMM') != -1) {
      _df = _df.replace('MMM', shortMonths[month]);
    }

    // Month of the year in numeric format e.g. 01
    if (_df && _df.indexOf('MM') != -1) {
      _df = _df.replace('MM', month + 1 < 10 ? '0' + (month + 1) : month + 1);
    }

    // hours
    if (_df && _df.indexOf('hh') != -1) {
      _df = _df.replace('hh', hour < 10 ? '0' + hour : hour);
    }

    // minutes
    if (_df && _df.indexOf('mm') != -1) {
      _df = _df.replace('mm', mins < 10 ? '0' + mins : mins);
    }

    // seconds
    if (_df && _df.indexOf('ss') != -1) {
      _df = _df.replace('ss', secs < 10 ? '0' + secs : secs);
    }

    return _df;
  };

  this.GetDPDate = function (dt) {
    if (!dt) {
      return '';
    }
    dt = new Date(dt);
    return dt.getUTCMonth() + 1 + '-' + dt.getDate() + '-' + dt.getFullYear();
  };

  //All Application Utility Dialogues and Modals to launch from here.

  this.CreateConfirmModal = function (title, quest, ok, cancel) {
    return $uibModal.open({
      templateUrl: 'confirm.tpl.html',
      controller: 'ConfirmDialogueCtrl',
      size: 'md',
      resolve: {
        items: function () {
          return {
            Title: title,
            Question: quest,
            Actions: {
              Ok: ok,
              Cancel: cancel,
            },
          };
        },
      },
    });
  };

  this.CreateViewDetailModal = function (title, quest, ok) {
    return $uibModal.open({
      templateUrl: 'viewdetail.tpl.html',
      controller: 'DetailModalCtrl',
      size: 'md',
      resolve: {
        items: function () {
          return {
            Title: title,
            Question: quest,
            Actions: {
              Ok: ok,
            },
          };
        },
      },
    });
  };

  this.CreateSelectListView = function (name, data, headers, cols) {
    return $uibModal.open({
      templateUrl: 'multiselectlist.tpl.html',
      controller: 'SelectListCtrl',
      size: 'lg',
      resolve: {
        items: function () {
          return {
            Title: name || '',
            Headers: headers,
            Columns: cols,
            List: data,
          };
        },
      },
    });
  };

  this.CreateSingleSelectListView = function (name, data, headers, cols) {
    return $uibModal.open({
      templateUrl: 'singleselectlist.tpl.html',
      controller: 'SingleSelectListCtrl',
      size: 'lg',
      resolve: {
        items: function () {
          return {
            Title: name || '',
            Headers: headers,
            Columns: cols,
            List: data,
          };
        },
      },
    });
  };
});
