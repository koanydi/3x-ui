# 3X-UI TK Custom Build

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./media/3x-ui-dark.png">
    <img alt="3x-ui" src="./media/3x-ui-light.png">
  </picture>
</p>

[![Release](https://img.shields.io/github/v/release/koanydi/3x-ui.svg)](https://github.com/koanydi/3x-ui/releases)
[![Build](https://img.shields.io/github/actions/workflow/status/koanydi/3x-ui/release.yml.svg)](https://github.com/koanydi/3x-ui/actions)
[![License](https://img.shields.io/badge/license-GPL%20V3-blue.svg?longCache=true)](https://www.gnu.org/licenses/gpl-3.0.en.html)

这是基于 [Teminuosi/3x-ui](https://github.com/Teminuosi/3x-ui) 二次修改的 3X-UI 面板，主要用于更方便地创建和管理中转节点。

当前定制内容：

- 新增中转落地协议 `Hysteria2`，支持粘贴 `hy2://` / `hysteria2://` 分享链接。
- 新增中转入口 `VLESS + Reality (TCP)`，作为默认入口方案，尽量兼顾速度和稳定性。
- 保留 `VLESS + Reality (Vision)` 和 `VLESS + Reality (gRPC)`，方便按线路情况切换。
- 安装、更新、面板内更新检查均指向本仓库 `koanydi/3x-ui`。
- 已发布可安装版本：[`v3.1.0-tk2`](https://github.com/koanydi/3x-ui/releases/tag/v3.1.0-tk2)。

> [!IMPORTANT]
> 本项目仅用于个人学习、研究和合法通信场景。请遵守当地法律法规，不要用于任何非法用途。

## 一键安装

推荐安装当前定制版本：

```bash
bash <(curl -Ls https://raw.githubusercontent.com/koanydi/3x-ui/main/install.sh) v3.1.0-tk2
```

如果希望脚本自动安装最新 Release：

```bash
XUI_AUTO=1 bash <(curl -Ls https://raw.githubusercontent.com/koanydi/3x-ui/main/install.sh)
```

安装完成后，在服务器执行：

```bash
x-ui
```

即可打开管理菜单，用于查看登录信息、修改端口、重启服务、更新或卸载面板。

## 中转建议

在中转美国 IP、TikTok 直播等对稳定性要求高的场景，建议优先尝试：

1. `VLESS + Reality (TCP)` 作为入口。
2. 落地端使用稳定的 `VLESS` / `Trojan` / `Hysteria2` 节点。
3. 如果 `Vision` 速度快但断流，可以保留作备用，不建议作为唯一入口。
4. `gRPC` 更依赖链路质量，跨境中转时可能出现延迟高、卡顿明显的情况。

## 发布地址

- 项目主页：[https://github.com/koanydi/3x-ui](https://github.com/koanydi/3x-ui)
- Releases：[https://github.com/koanydi/3x-ui/releases](https://github.com/koanydi/3x-ui/releases)
- Actions：[https://github.com/koanydi/3x-ui/actions](https://github.com/koanydi/3x-ui/actions)

## 说明

GitHub 页面上显示 `Forked from Teminuosi/3x-ui` 是正常的，因为这个仓库是从原项目 fork 出来的；实际安装脚本和 Release 下载源已经改为 `koanydi/3x-ui`。

## 致谢

- 上游项目：[Teminuosi/3x-ui](https://github.com/Teminuosi/3x-ui)
- 原始项目：[MHSanaei/3x-ui](https://github.com/MHSanaei/3x-ui)

本项目遵循 GPL-3.0 开源协议。
