/// <reference types="vite/client" />
import { describe, expect, it } from 'vitest';

import { rawInboundToFormValues } from '@/lib/xray/inbound-form-adapter';
import { INBOUND_PRESETS, getPreset } from '@/lib/xray/inbound-presets';
import { InboundFormSchema } from '@/schemas/forms/inbound-form';

// Every preset must produce a row that, once mapped to InboundFormValues,
// passes InboundFormSchema — the exact gate the modal's submit() runs before
// POSTing. If a preset ever drifts out of schema shape this fails loudly
// instead of silently rejecting the operator's one-click create.

describe('inbound presets', () => {
  for (const preset of INBOUND_PRESETS) {
    it(`${preset.id} builds a schema-valid inbound`, () => {
      const domain = preset.needsDomain ? 'example.com' : undefined;
      const values = rawInboundToFormValues(preset.build(domain));
      const parsed = InboundFormSchema.safeParse(values);
      if (!parsed.success) {
        throw new Error(`${preset.id} failed: ${JSON.stringify(parsed.error.issues, null, 2)}`);
      }
      expect(parsed.success).toBe(true);
    });

    it(`${preset.id} seeds exactly one client`, () => {
      const row = preset.build('example.com');
      const settings = row.settings as { clients?: unknown[] };
      expect(Array.isArray(settings.clients)).toBe(true);
      expect(settings.clients).toHaveLength(1);
    });
  }

  it('reality presets carry a target and shortIds but leave keys empty', () => {
    const preset = getPreset('vless-reality-vision')!;
    const stream = preset.build().streamSettings as {
      realitySettings: { target: string; shortIds: string[]; privateKey: string };
    };
    expect(stream.realitySettings.target).not.toBe('');
    expect(stream.realitySettings.shortIds.length).toBeGreaterThan(0);
    // Keys are fetched from the panel after apply, not baked into the preset.
    expect(stream.realitySettings.privateKey).toBe('');
  });

  it('TLS presets thread the domain into serverName', () => {
    const preset = getPreset('trojan-tls')!;
    const stream = preset.build('my.host.example').streamSettings as {
      tlsSettings: { serverName: string };
    };
    expect(stream.tlsSettings.serverName).toBe('my.host.example');
  });

  it('vision preset uses xtls-rprx-vision flow, grpc preset does not', () => {
    const vision = getPreset('vless-reality-vision')!.build().settings as {
      clients: { flow: string }[];
    };
    const grpc = getPreset('vless-reality-grpc')!.build().settings as {
      clients: { flow: string }[];
    };
    expect(vision.clients[0].flow).toBe('xtls-rprx-vision');
    expect(grpc.clients[0].flow).toBe('');
  });
});
