# Bootloader 解锁方案分析

**设备**: 红米 K70 (Note 14 Pro) — 代号 `amethyst`
**处理器**: 第三代骁龙 7s (SM7635)
**系统**: HyperOS (澎湃 OS) / Android 16
**安全补丁**: 2026-03-01
**更新时间**: 2026-07-04

---

## 当前状态

| 检测项 | 值 | 说明 |
|--------|------|------|
| `verifiedbootstate` | green | Bootloader 锁定，未解锁 |
| `flash.locked` | 1 | 锁定 |
| `vbmeta.device_state` | locked | 未解锁 |
| `avb_version` | 1.2 | AVB 校验启用 |
| SELinux | Enforcing | 强制模式 |
| 安全补丁 | 2026-03-01 | 已超过 2026 年 2 月分界线 |

---

## 解锁方案评估

### 方案一：小米官方解锁 ⛔ 不可行

小米已关闭社区解锁通道。且该设备是 **出厂澎湃 OS 机型**，被归类为「终身无解」设备。

### 方案二：免授权解锁工具 ❓ 需进一步验证

2026 年 2 月后，部分高通设备需使用免授权工具（如 Waylan Unlock、第三方服务）解锁。
但公开的方案汇总中**未包含骁龙 7s Gen 3 (SM7635)**，不确定是否有对应工具支持。

**风险**: 铠侠/东芝字库设备可能黑砖，需先查字库品牌。

### 方案三：付费解锁服务 ❓ 成本高

存在付费远程解锁服务，但针对 SM7635 平台的方案未公开确认，且价格不菲。

### 方案四：提权漏洞免解锁 Root ❓ 补丁版本过高

部分设备可通过提权漏洞在不解锁 BL 的情况下获取 Root 权限。
但设备当前安全补丁为 **2026-03-01**，已超过已知漏洞的覆盖范围。

---

## 当前可行方向

1. **冻结系统更新** — 防止补丁版本继续升高，保留可能性
2. **降级系统** — 尝试降级到 2026 年 2 月前的版本（需确认是否可行及风险）
3. **查询字库品牌** — 使用澎湃工具箱等工具确认字库厂商
4. **关注社区动态** — SM7635 平台的解锁方案可能后续才会出现

---

## 参考链接

- [小米全平台解锁BL综合指南（2026.5更新）](https://blog.csdn.net/akunkuntaimei/article/details/161116533)
- [XDA: Bootloader Unlock for Amethyst](https://xdaforums.com/t/bootloader-unlock-for-amethyst-note-14-pro-region-lock-fake-rom.4786105/)
- [2026 All Brands Bootloader Unlock Status](https://github.com/AdaUnlocked/2026-All-Brands-Bootloader-Unlock-Status)
