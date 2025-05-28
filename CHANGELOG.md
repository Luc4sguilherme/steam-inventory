## [1.5.3](https://github.com/Luc4sguilherme/steam-inventory/compare/v1.5.2...v1.5.3) (2025-05-28)


### Bug Fixes

* fix corrupted Steam data possibly overwriting inventory item assetids ([34d4a24](https://github.com/Luc4sguilherme/steam-inventory/commit/34d4a24d1325c826b3d9009240a99939dcfc82ba))

## [1.5.2](https://github.com/Luc4sguilherme/steam-inventory/compare/v1.5.1...v1.5.2) (2025-05-14)


### Bug Fixes

* fix package URL ([f79fb43](https://github.com/Luc4sguilherme/steam-inventory/commit/f79fb437cab5768e019880db2aef5559222940d8))

## [1.5.1](https://github.com/Luc4sguilherme/steam-inventory/compare/v1.5.0...v1.5.1) (2025-05-13)


### Bug Fixes

* fix cache_expiration restore for CS2 Items ([21adafd](https://github.com/Luc4sguilherme/steam-inventory/commit/21adafd4ddb3f1b523358c78323c6d0f3d0c8987))

# [1.5.0](https://github.com/Luc4sguilherme/steam-inventory/compare/v1.4.0...v1.5.0) (2025-05-13)


### Features

* add support for expressload ([77519ec](https://github.com/Luc4sguilherme/steam-inventory/commit/77519ec8a9cc6a1c8eeb3a976b38eb8e32bc2dd6))

# [1.4.0](https://github.com/Luc4sguilherme/steam-inventory/compare/v1.3.2...v1.4.0) (2025-03-30)


### Bug Fixes

* fix receiving Malformed response error when fetching a CS2 inventory that has no visible items ([a7a0f5f](https://github.com/Luc4sguilherme/steam-inventory/commit/a7a0f5fb01f98ebdf282c992188c800bb2fa025d))


### Features

* add origin header to all non-GET requests ([efd9680](https://github.com/Luc4sguilherme/steam-inventory/commit/efd9680239c74db682d4392a4b0eb3dc65282b5b))

## [1.3.2](https://github.com/Luc4sguilherme/steam-inventory/compare/v1.3.1...v1.3.2) (2024-09-14)


### Bug Fixes

* add handling for undefined response error ([cbfa4d3](https://github.com/Luc4sguilherme/steam-inventory/commit/cbfa4d3f9f647db7aa5bc1fff3cb0b347664e39c))

## [1.3.1](https://github.com/Luc4sguilherme/steam-inventory/compare/v1.3.0...v1.3.1) (2024-05-15)


### Bug Fixes

* fix http error 401 handling ([c81bf68](https://github.com/Luc4sguilherme/steam-inventory/commit/c81bf6814889320ec4ffad00f1eb7adf29b044bf))

# [1.3.0](https://github.com/Luc4sguilherme/steam-inventory/compare/v1.2.0...v1.3.0) (2024-05-14)


### Features

* add support for access token ([c3e0c28](https://github.com/Luc4sguilherme/steam-inventory/commit/c3e0c28110c8504e7de13ba3ab2c6bd06f9d22d2))


### Reverts

* Revert "fix: fix http error 401 handling" ([948d545](https://github.com/Luc4sguilherme/steam-inventory/commit/948d545ba42a92dc883fa8c4bb6f56e0da66f350))

# [1.2.0](https://github.com/Luc4sguilherme/steam-inventory/compare/v1.1.1...v1.2.0) (2024-04-23)


### Features

* add delay for fake redirects in steam.supply API ([0755d47](https://github.com/Luc4sguilherme/steam-inventory/commit/0755d4725b6d13f1cdaf18361efb9498949f5a69))

## [1.1.1](https://github.com/Luc4sguilherme/steam-inventory/compare/v1.1.0...v1.1.1) (2024-04-18)


### Bug Fixes

* fix cookie issue caused by differing tokens across different Steam domains ([3836c16](https://github.com/Luc4sguilherme/steam-inventory/commit/3836c1696ee4edb2e25c547374f69f47bf2194af))
* fix steamID property not being set when using cookies that have a domain attribute ([8e4420c](https://github.com/Luc4sguilherme/steam-inventory/commit/8e4420c78e22d273f1821064aac2d45c69abaea7))

# [1.1.0](https://github.com/Luc4sguilherme/steam-inventory/compare/v1.0.2...v1.1.0) (2024-04-18)


### Features

* increase the quantity of items per request to 5k ([49e8034](https://github.com/Luc4sguilherme/steam-inventory/commit/49e80343ff5ccaaa25a9f9573e908972e56d455a))

## [1.0.2](https://github.com/Luc4sguilherme/steam-inventory/compare/v1.0.1...v1.0.2) (2024-04-07)


### Bug Fixes

* fix http error 401 handling ([cff415f](https://github.com/Luc4sguilherme/steam-inventory/commit/cff415fa118d94b08fe5305024f456d0beb00cf8))

## [1.0.1](https://github.com/Luc4sguilherme/steam-inventory/compare/v1.0.0...v1.0.1) (2024-04-05)


### Bug Fixes

* fix cs2 inventory handling ([d2f620e](https://github.com/Luc4sguilherme/steam-inventory/commit/d2f620e3041bb3867beb7a315cd5f79df011a458))

# 1.0.0 (2024-03-25)


### Features

* initial commit ([b54cf54](https://github.com/Luc4sguilherme/steam-inventory/commit/b54cf54027bf4aed7969136f1db1227742858d34))
