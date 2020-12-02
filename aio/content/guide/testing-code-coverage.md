{@a code-coverage}

<!--
# Find out how much code you're testing
-->
# 애플리케이션 코드를 얼마나 많이 테스트하고 있는지 확인하기

<!--
The CLI can run unit tests and create code coverage reports.
Code coverage reports show you any parts of your code base that may not be properly tested by your unit tests.

<div class="alert is-helpful">

  For the sample app that the testing guides describe, see the <live-example name="testing" embedded-style noDownload>sample app</live-example>.

  For the tests features in the testing guides, see <live-example name="testing" stackblitz="specs" noDownload>tests</live-example>.

</div>


To generate a coverage report run the following command in the root of your project.

<code-example language="sh" class="code-shell">
  ng test --no-watch --code-coverage
</code-example>

When the tests are complete, the command creates a new `/coverage` folder in the project. Open the `index.html` file to see a report with your source code and code coverage values.

If you want to create code-coverage reports every time you test, you can set the following option in the CLI configuration file, `angular.json`:

```
  "test": {
    "options": {
      "codeCoverage": true
    }
  }
```
-->
Angular CLI는 유닛 테스트를 실행하면서 코드 커버리지 보고서를 생성할 수 있습니다.
코드 커버리지 보고서를 보면 유닛 테스트가 애플리케이션을 어느 범위까지 테스트하는지 확인할 수 있습니다.

<div class="alert is-helpful">

이 문서에서 다루는 예제 앱은 <live-example name="testing" embedded-style noDownload>sample app</live-example>에서 확인할 수 있습니다.

그리고 이 문서에서 다루는 테스트 기능은 <live-example name="testing" stackblitz="specs" noDownload>tests</live-example>에서 확인할 수 있습니다.

</div>

커버리지 보고서를 생성하려면 프로젝트 최상위 폴더에서 이 명령을 실행하면 됩니다.

<code-example language="sh" class="code-shell">
  ng test --no-watch --code-coverage
</code-example>

이 명령을 실행하고 테스트가 끝나면 프로젝트에 `/coverage` 폴더가 생성됩니다.
이 폴더 안에 있는 `index.html` 파일을 열면 소스 코드와 소스 커버리지 값을 확인할 수 있습니다.

테스트를 실행할 때마다 코드 커버리지 보고서를 생성하려면 Angular CLI 환경설정 파일 `angular.json`에 이런 옵션을 지정하면 됩니다:

```
  "test": {
    "options": {
      "codeCoverage": true
    }
  }
```


<!--
## Code coverage enforcement
-->
## 코드 커버리지 강제하기

<!--
The code coverage percentages let you estimate how much of your code is tested.
If your team decides on a set minimum amount to be unit tested, you can enforce this minimum with the Angular CLI.

For example, suppose you want the code base to have a minimum of 80% code coverage.
To enable this, open the [Karma](https://karma-runner.github.io) test platform configuration file, `karma.conf.js`, and add the following in the `coverageIstanbulReporter:` key.

```
coverageIstanbulReporter: {
  reports: [ 'html', 'lcovonly' ],
  fixWebpackSourcePaths: true,
  thresholds: {
    statements: 80,
    lines: 80,
    branches: 80,
    functions: 80
  }
}
```

The `thresholds` property causes the tool to enforce a minimum of 80% code coverage when the unit tests are run in the project.
-->
코드 커버리지 퍼센트 값을 보면 애플리케이션 코드를 얼마나 테스트하는지 확인할 수 있습니다.
팀에서 이 값을 어느 정도 이상으로 유지하려고 할 때 이 값을 강제할 수 있습니다.


코드 커버리지 값이 최소한 80%는 되어야 한다고 합시다.
이 값을 강제하려면 [Karma](https://karma-runner.github.io) 테스트 플랫폼 설정 파일 `karma.conf.js`에 `coverageIstanbulReporter:` 키를 추가하면 됩니다.

```
coverageIstanbulReporter: {
  reports: [ 'html', 'lcovonly' ],
  fixWebpackSourcePaths: true,
  thresholds: {
    statements: 80,
    lines: 80,
    branches: 80,
    functions: 80
  }
}
```

`thresholds` 프로퍼티에 지정하는 값이 코드 커버리지로 강제하는 값입니다.
