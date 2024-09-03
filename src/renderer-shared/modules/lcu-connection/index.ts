import { StateSyncModule } from '@renderer-shared/akari-ipc/state-sync-module'

import { UxCommandLine, useLcuConnectionStore } from './store'

export class LcuConnectionRendererModule extends StateSyncModule {
  constructor() {
    super('lcu-connection')
  }

  override async setup() {
    await super.setup()

    this._syncMainState()
  }

  private _syncMainState() {
    const store = useLcuConnectionStore()

    this.simpleSync('settings/auto-connect', (s) => (store.settings.autoConnect = s))

    this.sync(store, this.id, 'state')
    this.sync(store, this.id, 'auth')
    this.sync(store, this.id, 'connectingClient')
    this.sync(store, this.id, 'launchedClients')
  }

  gameClientRequest(config: object) {
    return this.call('game-client-request', config)
  }

  lcuRequest(config: object) {
    return this.call('lcu-http-request', config)
  }

  lcuConnect(auth: UxCommandLine) {
    return this.call('lcu-connect', auth)
  }

  lcuDisconnect() {
    return this.call('lcu-disconnect')
  }

  setAutoConnect(value: boolean) {
    return this.call('set-setting/auto-connect', value)
  }
}

export const lcuConnectionRendererModule = new LcuConnectionRendererModule()
