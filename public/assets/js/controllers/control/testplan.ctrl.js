(function () {
  TestPlanController.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$filter',
    'ControlService',
    'Utils',
  ];
  app.controller('TestPlanCtrl', TestPlanController);

  function TestPlanController(
    $scope,
    $rootScope,
    $state,
    $filter,
    ControlService,
    Utils
  ) {
    $scope.mainTitle = $state.current.title;
    $scope.mainDesc = 'Add Edit Search & Delete Control Test Plans';

    $scope.OpList = [5, 10, 25, 50, 100];
    $scope.Grid1 = {
      PerPage: 10,
      CurrPage: 1,
      Column: 'riskName',
      IsAsc: true,
      Filter: '',
      Total: 0,
      Data: [],
      SortMe: function (col) {
        if ($scope.Grid1.Column === col)
          $scope.Grid1.IsAsc = !$scope.Grid1.IsAsc;
        else $scope.Grid1.Column = col;
      },
      GetIco: function (col) {
        if ($scope.Grid1.Column === col) {
          return $scope.Grid1.IsAsc ? 'fa-sort-up' : 'fa-sort-down';
        } else {
          return 'fa-unsorted';
        }
      },
    };
    $scope.$watch('Grid1.Filter', function (n, o) {
      var searchedData = $filter('filter')(
        $scope.Grid1.Data,
        $scope.Grid1.Filter
      );
      $scope.Grid1.Total = searchedData.length;
    });

    $scope.delete = function (r) {
      var confirmation = Utils.CreateConfirmModal(
        'Confirm Deletion',
        'Are you sure you want to delete the selected item',
        'Yes',
        'No'
      );
      confirmation.result.then(
        function () {
          $rootScope.app.Mask = true;
          ControlService.DeleteTestPlans(r.id).then(function (data) {
            console.log(data);
            if (data.status === 200) loadTestPlans();
          });
        },
        function () {
          $rootScope.app.Mask = false;
        }
      );
    };

    loadTestPlans();
    function loadTestPlans() {
      ControlService.GetTestPlans(
        $scope.Grid1.PerPage,
        $scope.Grid1.CurrPage
      ).then(function (data) {
        data = data.map(function (el, index) {
          if (el.department) {
            el['department'] = el.department && el.department.filter((o) => o);

            if (el.department.length) {
              el['deptName'] = el.department[0].deptName;
            }
          }

          var dtype = 'MM-DD-YYYY';
          var d1 = moment(el.testDueDate);
          var d2 = moment(el.nextDueDate);

          el['testDueDate'] = d1.isValid() ? d1.format(dtype) : '';
          el['nextDueDate'] = d2.isValid() ? d2.format(dtype) : '';

          return { ...el };
        });

        $scope.Grid1.Total = data.length;
        $scope.Grid1.Data = data;

        $rootScope.app.Mask = false;
      });
    }

    $scope.selectAll = function () {
      var chk = $scope.all_check;
      $('.table>tbody')
        .find('input:checkbox')
        .each(function (i) {
          this.checked = chk;
        });
    };
  }
})();
