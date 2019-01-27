<!--
# Angular Workspace Configuration
-->
# 워크스페이스 설정

<!--
A file named `angular.json` at the root level of an Angular [workspace](guide/glossary#workspace) provides workspace-wide and project-specific configuration defaults for build and development tools provided by the Angular CLI. 
Path values given in the configuration are relative to the root workspace folder. 
-->
Angular [워크스페이스](guide/glossary#workspace) 최상위 폴더에 있는 `angular.json` 파일은 워크스페이스와 프로젝트를 대상으로 Angular CLI를 실행할 때 기본값으로 적용될 내용을 설정하는 파일입니다.
이 파일에 사용하는 모든 주소는 워크스페이스 최상위 폴더를 기준으로 하는 상대 주소입니다.

<!--
## Overall JSON structure
-->
## JSON 최상위 계층

<!--
At the top level of `angular.json`, a few properties configure the workspace, and a `projects` section contains the remaining per-project configuration options. 

* `version`: The configuration-file version.
* `newProjectRoot`: Path where new projects are created. Absolute or relative to the workspace folder.
* `defaultProject`: Default project name to use in commands, where not provided as an argument. When you use `ng new` to create a new app in a new workspace, that app is the default project for the workspace until you change it here.
* `projects` : Contains a subsection for each project (library, app, e2e test app) in the workspace, with the per-project configuration options. 

The initial app that you create with `ng new app_name` is listed under "projects", along with its corresponding end-to-end test app: 
-->
`angular.json` 파일의 최상위 계층에는 워크스페이스를 설정하는 프로퍼티가 존재합니다. 이 계층에서 `projects` 섹션을 정의하면 특정 프로젝트에 옵션을 지정할 수 있습니다.

* `version`: 설정 파일의 버전을 의미합니다.
* `newProjectRoot`: 새로운 프로젝트가 생성될 위치를 지정합니다. 워크스페이스 폴더를 기준으로 절대주소를 사용하거나 상대주소를 사용합니다.
* `defaultProject`: 특정 프로젝트를 지정하지 않고 Angular CLI 명령을 실행할 때 기본 대상이 되는 프로젝트를 지정합니다. `ng new` 명령을 실행해서 새 워크스페이스와 새 앱을 실행하면 이 프로젝트가 워크스페이스의 기본 프로젝트로 지정됩니다.
* `projects`: 라이브러리나 앱, e2e 테스트 앱 등 워크스페이스에 존재하는 각각의 프로젝트에 적용되는 옵션을 지정합니다.

`ng new app_name` 명령을 실행해서 앱을 생성하면 이 앱은 "projects" 목록에 둥록되는데, 이 때 이 앱에 적용되는 엔드-투-엔드 테스트 앱도 함께 등록됩니다:

<code-example format="." language="none" linenums="false">
projects
  app_name
    ...
  app_name-e2e
    ...
</code-example>

<!--
Each additional app that you create with `ng generate application` has a corresponding end-to-end test project, with its own configuration section.
When you create a library project with `ng generate library`, the library project is also added to the `projects` section. 
-->
`ng generate application` 명령을 실행해서 앱을 생성하면 엔드-투-엔드 테스트 프로젝트도 함께 생성되며, 이 프로젝트에 해당하는 환경 설정도 `angular.json` 파일에 자동으로 생성됩니다.
그리고 `ng generate library` 명령을 실행해서 라이브러리 프로젝트를 생성하면 이 라이브러리 프로젝트도 `projects` 섹션에 추가됩니다.

<div class="alert is-helpful">

  <!--
  Note that the `projects` section of the configuration file does not correspond exactly to the workspace file structure. 
  * The initial app created by `ng new` is at the top level of the workspace file structure, along with its e2e app.
  * Additional apps, e2e apps, and libraries go into a `projects` folder in the workspace.

  For more information, see [Workspace and project file structure](guide/file-structure).
  -->
  `angular.json` 파일의 `projects` 섹션 구조가 워크스페이스 파일 구조와 정확히 일치하지는 않습니다.
  * `ng new` 명령을 실행해서 만든 앱과 e2e 앱은 워크스페이스 파일 구조의 최상위 계층에 존재합니다.
  * 그 이후에 추가되는 앱과 e2e 앱, 라이브러리는 이 워크스페이스의 `projects` 폴더 안에 생성됩니다.

  더 자세한 내용은 [워크스페이스와 프로젝트 파일 구조](guide/file-structure) 문서를 참고하세요.

</div>

<!--
## Project configuration options
-->
## 프로젝트 옵션

<!--
The following top-level configuration properties are available for each project, under `projects:<project_name>`.
-->
다음 옵션들은 프로젝트에 적용하는 프로퍼티 중 최상위 계층에 존재하는 프로퍼티입니다.

<code-example format="." language="json" linenums="false">
    "my-v7-app": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {},
      "architect": {}
    }
</code-example>

<!--
| PROPERTY | DESCRIPTION |
| :-------------- | :---------------------------- |
| `root`          | The root folder for this project's files, relative to the workspace folder. Empty for the initial app, which resides at the top level of the workspace. |
| `sourceRoot`    | The root folder for this project's source files. |
| `projectType`   | One of "application" or "library". An application can run independently in a browser, while a library cannot. Both an app and its e2e test app are of type "application".|
| `prefix`        | A string that Angular prepends to generated selectors. Can be customized to identify an app or feature area. |
| `schematics`    | An object containing schematics that customize CLI commands for this project. |
| `architect`     | An object containing configuration defaults for Architect builder targets for this project. |
-->
| 프로퍼티 | 설명 |
| :-------------- | :---------------------------- |
| `root`          | 프로젝트 파일의 최상위 폴더를 지정하며, 워크스페이스 폴더로부터 상대 경로로 지정합니다. 워크스페이스 기본 앱은 워크스페이스 최상위 계층에 존재하기 때문에 빈 문자열로 지정됩니다. |
| `sourceRoot`    | 프로젝트의 소스 파일이 위치하는 폴더를 지정합니다. |
| `projectType`   | 프로젝트 타입을 "application"이나 "library" 중 하나로 지정합니다. 애플리케이션 프로젝트는 브라우저에 단독으로 실행할 수 있지만 라이브러리는 이렇게 실행할 수 없습니다. 앱과 e2e 테스트 앱은 모두 "application" 타입입니다.|
| `prefix`        | Angular CLI가 자동으로 생성하는 셀렉터의 접두사를 지정합니다. 앱 단위나 기능모듈 단위로 지정할 수 있습니다. |
| `schematics`    | 프로젝트에서 사용하는 Angular CLI 명령을 커스터마이징 할 때 사용합니다. |
| `architect`     | 프로젝트에 적용되는 Architect 빌더 옵션을 설정합니다. |

<!--
## Project tool configuration options
-->
## Architect 옵션

<!--
Architect is the tool that the CLI uses to perform complex tasks such as compilation and test running, according to provided configurations. The `architect` section contains a set of Architect *targets*. Many of the targets correspond to the CLI commands that run them. Some additional predefined targets can be run using the `ng run` command, and you can define your own targets.

Each target object specifies the `builder` for that target, which is the npm package for the tool that Architect runs. In addition, each target has an `options` section that configure default options for the target, and a `configurations` section that names and specifies alternative configurations for the target. See the example in [Build target](#build-target) below. 
-->
Angular CLI는 컴파일이나 앱 테스트 등 복잡한 작업을 처리할 때 Architect 툴을 사용합니다. 그리고 Architect 작업은 프로젝트 옵션 중 `architect` 섹션에 Architect *대상*을 명시하는 방식으로 등록합니다. 이렇게 등록된 Architect 작업에 대한 옵션은 관련된 Angular CLI 명령이 실행될 때 자동으로 적용되며, `ng run` 명령으로 실행하는 Architect 작업을 추가할 수도 있습니다.

Architect 작업 옵션은 객체형식으로 지정하는데, 이 객체에 `builder`를 지정하면 Architect 작업이 실행될 때 사용할 npm 패키지를 지정할 수 있습니다. 그리고 작업 옵션에 `options` 섹션을 활용하면 Architect 작업이 실행될 때 적용될 기본값을 지정할 수 있으며, `configurations` 섹션을 활용하면 다양한 설정 중 원하는 것을 선택해서 Architect 작업을 실행할 수 있습니다. 자세한 내용은 [빌드 대상](#build-target) 섹션을 참고하세요.

<code-example format="." language="json" linenums="false">
      "architect": {
        "build": { },
        "serve": { },
        "e2e" : { },
        "test": { },
        "lint": { },
        "extract-i18n": { },
        "server": { },
        "app-shell": { }
      }
</code-example>

<!--
* The `architect/build` section configures defaults for options of the `ng build` command. See [Build target](#build-target) below for more information.

* The `architect/serve` section overrides build defaults and supplies additional serve defaults for the `ng serve` command.  In addition to the options available for the `ng build` command, it adds options related to serving the app.

* The `architect/e2e` section overrides build-option defaults for building end-to-end testing apps using the `ng e2e` command.

* The `architect/test` section overrides build-option defaults for test builds and supplies additional test-running defaults for the `ng test` command.

* The `architect/lint` section configures defaults for options of the `ng lint` command, which performs code analysis on project source files.  The default linting tool for Angular is [TSLint](https://palantir.github.io/tslint/).

* The `architect/extract-i18n` section configures defaults for options of the `ng-xi18n` tool used by the `ng xi18n` command, which extracts marked message strings from source code and outputs translation files.

* The `architect/server` section configures defaults for creating a Universal app with server-side rendering, using the `ng run <project>:server` command. 

* The `architect/app-shell` section configures defaults for creating an app shell for a progressive web app (PWA), using the `ng run <project>:app-shell` command.

In general, the options for which you can configure defaults correspond to the command options listed in the [CLI reference page](cli) for each command. 
Note that all options in the configuration file must use [camelCase](guide/glossary#case-conventions), rather than dash-case.
-->
* `architect/build` 섹션에는 `ng build` 명령을 실행할 때 적용될 옵션을 지정합니다. 자세한 내용은 아래 [빌드 대상](#build-target) 섹션을 참고하세요.

* `architect/serve` 섹션에는 `ng serve` 명령을 실행할 때 적용될 옵션을 지정하며, 이 옵션은 빌드 옵션을 오버라이드합니다. `ng serve` 명령을 실행하면 `ng build`에 적용된 옵션이 먼저 적용되며, `architect/serve` 섹션에 추가된 옵션을 추가로 적용해서 앱이 실행됩니다.

* `architect/e2e` 섹션에는 `ng e2e` 명령을 실행해서 엔드-투-엔드 테스트를 실행할 때 적용될 옵션을 지정합니다.

* `architect/test` 섹션에는 `ng test` 명령을 실행할 때 적용될 옵션을 지정하며, 이 옵션은 빌드 옵션을 오버라이드합니다.

* `architect/lint` 섹션에는 `ng lint` 명령을 실행할 때 적용될 옵션을 지정합니다. Lint 툴은 코딩 스타일을 일관된 형식 작성했는지 검사하는 정적 분석 툴이며, Angular가 사용하는 기본 Lint 툴은 [TSLint](https://palantir.github.io/tslint/) 입니다.

* `architect/extract-i18n` 섹션에는 `ng xi18n` 명령을 실행했을 때 실행되는 `ng-xi18n` 툴에 적용될 옵션을 지정합니다. 이 명령은 다국어 지원을 위해 소스 코드에서 문자열을 추출할 때 사용합니다.

* `architect/server` 섹션에는 `ng run <프로젝트>:server` 명령을 실행해서 서버-사이드 렌더링을 지원하는 유니버설 앱을 생성할 때 적용되는 옵션을 지정합니다.

* `architect/app-shell` 섹션에는 `ng run <프로젝트>:app-shell` 명령을 실행해서 PWA 앱의 기본 틀을 생성할 때 적용될 옵션을 지정합니다.

일반적으로 섹션들에 지정할 수 있는 옵션은 Angular CLI를 실행할 때 적용하는 옵션과 같으며, 전체 목록은 [Angular CLI 페이지](cli)에서 확인할 수 있습니다.
모든 옵션은 대시 케이스가 아니라 [캐멀 케이스(camelCase)](guide/glossary#case-conventions)로 작성해야 합니다.

{@a build-target}

<!--
## Build target
-->
## 빌드 대상

<!--
The `architect/build` section configures defaults for options of the `ng build` command. It has the following top-level properties.

| PROPERTY | DESCRIPTION |
| :-------------- | :---------------------------- |
| `builder`       | The npm package for the build tool used to create this target. The default is `@angular-devkit/build-angular:browser`, which uses the [webpack](https://webpack.js.org/) package bundler. |
| `options`       | This section contains defaults for build options, used when no named alternative configuration is specified. See [Default build options](#build-props) below. |
| `configurations`| This section defines and names alternative configurations for different intended destinations. It contains a section for each named configuration, which sets the default options for that intended environment. See [Alternate build configurations](#build-configs) below. |
-->
`architect/build` 섹션에는 `ng build` 명령을 실행할 때 적용될 옵션을 지정합니다. 이 옵션의 최상위 계층에는 다음과 같은 프로퍼티를 지정할 수 있습니다.

| 프로퍼티 | 설명 |
| :-------------- | :---------------------------- |
| `builder`       | 앱을 빌드할 때 사용하는 npm 패키지를 지정합니다. 기본값은 [webpack](https://webpack.js.org/) 패키지 번들러를 기반으로 동작하는 `@angular-devkit/build-angular:browser`입니다. |
| `options`       | 빌드할 때 적용될 옵션을 지정합니다. 자세한 내용은 아래 [기본 빌드 옵션](#build-props) 섹션을 참고하세요. |
| `configurations`| 환경 설정을 대체할 수 있는 옵션을 지정합니다. 이 옵션을 사용하면 애플리케이션을 여러 환경에서 동작할 수 있도록 빌드할 때 각기 다른 설정 파일을 지정할 수 있습니다. 자세한 내용은 아래 [빌드 옵션 변경](#build-configs) 섹션을 참고하세요. |

{@a build-configs}

<!--
### Alternate build configurations
-->
### 빌드 옵션 변경

<!--
By default, a `production` configuration is defined, and the `ng build` command has `--prod` option that builds using this configuration. The `production` configuration sets defaults that optimize the app in a number of ways, such bundling files, minimizing excess whitespace, removing comments and dead code, and rewriting code to use short, cryptic names ("minification"). 

You can define and name additional alternate configurations (such as `stage`, for instance) appropriate to your development process. Some examples of different build configurations are `stable`, `archive` and `next` used by AIO itself, and the individual locale-specific configurations required for building localized versions of an app. For details, see [Internationalization (i18n)](guide/i18n#merge-aot). 
-->
`ng build` 명령을 실행할 때 `--prod` 옵션을 사용하면 `production` 설정이 적용되는데, `production` 설정에는 애플리케이션 번들링을 최적화하기 위해 공백 문자나 주석, 사용하지 않는 코드를 제거하고, 코드를 짧게 변환하면서 난독화하는 동작을 포함되어 있습니다.

개발 과정에 필요하다면 `stage`와 같은 빌드 설정을 추가할 수도 있습니다. 그래서 Angular IO (Angular 공식 가이드 문서) 프로젝트는 `stable`, `archive`, `next`와 같은 빌드 설정을 추가로 정의해서 사용하고 있으며, 애플리케이션에 다국어를 적용하기 위한 설정도 추가할 수 있습니다. 자세한 내용은 [Internationalization (i18n)](guide/i18n#merge-aot) 문서를 참고하세요.

{@a build-props}

<!--
### Additional build and test options
-->
### 빌드/테스트 추가 옵션

<!--
The configurable options for a default or targeted build generally correspond to the options available for the [`ng build`](cli/build), [`ng serve`](cli/serve), and [`ng test`](cli/test) commands. For details of those options and their possible values, see the [CLI Reference](cli). 

Some additional options (listed below) can only be set through the configuration file, either by direct editing or with the `ng config` command.
-->
이 환경설정 파일은 일반적으로 [`ng build`](cli/build), [`ng serve`](cli/serve), [`ng test`](cli/test) 명령에 적용됩니다. 이 명령에 사용할 수 있는 옵션의 목록은 [Angular CLI](cli) 문서를 참고하세요.

그런데 Angular CLI 명령을 실행하면서 사용하는 옵션 외에 `angular.json` 파일에만 설정할 수 있는 옵션도 있습니다. 이 옵션은 `ng config` 명령으로 설정해도 됩니다.

<!--
| OPTIONS PROPERTIES | DESCRIPTION |
| :------------------------- | :---------------------------- |
| `fileReplacements`         | An object containing files and their compile-time replacements. |
| `stylePreprocessorOptions` | An object containing option-value pairs to pass to style preprocessors. |
| `assets`                   | An object containing paths to static assets to add to the global context of the project. The default paths point to the project's icon file and its `assets` folder. |
| `styles`                   | An object containing style files to add to the global context of the project. Angular CLI supports CSS imports and all major CSS preprocessors: [sass/scss](http://sass-lang.com/), [less](http://lesscss.org/), and [stylus](http://stylus-lang.com/). |
| `scripts`                  | An object containing JavaScript script files to add to the global context of the project. The scripts are loaded exactly as if you had added them in a `<script>` tag inside `index.html`. |
| `budgets`                  | Default size-budget type and threshholds for all or parts of your app. You can configure the builder to report a warning or an error when the output reaches or exceeds a threshold size. See [Configure size budgets](guide/build#configure-size-budgets). (Not available in `test` section.) |
-->
| 옵션 프로퍼티 | 설명 |
| :------------------------- | :---------------------------- |
| `fileReplacements`         | 컴파일 시점에 일부 파일을 다른 파일로 대체할 때 사용합니다. |
| `stylePreprocessorOptions` | 스타일 파일을 전처리 할 때 사용합니다. |
| `assets`                   | 프로젝트 전역 범위에 정적으로 제공되는 리소스 파일을 지정합니다. 프로젝트 아이콘 파일과 `assets` 폴더가 기본으로 지정되어 있습니다. |
| `styles`                   | 프로젝트 전역 범위에 적용될 스타일 파일을 지정합니다. Angular CLI는 CSS 외에도 [sass/scss](http://sass-lang.com/), [less](http://lesscss.org/), [stylus](http://stylus-lang.com/)를 지원합니다. |
| `scripts`                  | 프로젝트 전역 범위에 추가될 JavaScript 스크립트 파일을 지정합니다. 이 옵션을 사용하면 `index.html`에 `<script>`로 JavaScript 파일을 추가한 것과 같은 효과를 냅니다. |
| `budgets`                  | 애플리케이션을 빌드한 후에 최종 빌드 결과물의 크기를 검사하기 위해 사용합니다. 이 옵션은 빌드 결과물이 일정 크기를 넘었을 때 경고 메시지를 표시하거나 에러 메시지를 표시하는 용도로 사용합니다. 자세한 내용은 [빌드 결과물 크기 설정](guide/build#configure-size-budgets) 문서를 참고하세요. (이 옵션은 `test` 섹션에 사용할 수 없습니다.) |
