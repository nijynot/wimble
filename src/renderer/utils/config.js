import { app } from 'utils/app';

const SERVER = {
  server: {
    db_root: `${app.getPath('home')}/.grin/main/chain_data`,
    api_http_addr: '127.0.0.1:3413',
    api_secret_path: `${app.getPath('home')}/.grin/main/.api_secret`,
    chain_type: 'Mainnet',
    chain_validation_mode: 'Disabled',
    archive_mode: false,
    skip_sync_wait: false,
    run_tui: false,
    run_test_miner: false,
    p2p_config: {
      host: '0.0.0.0',
      port: 3414,
      seeding_type: 'DNSSeed',
      capabilities: {
        bits: 15,
      },
    },
    pool_config: {
      accept_fee_base: 1000000,
      max_pool_size: 50000,
      max_stempool_size: 50000,
      mineable_max_weight: 40000,
    },
    dandelion_config: {
      epoch_secs: 600,
      embargo_secs: 180,
      aggregation_secs: 30,
      stem_probability: 90,
    },
    stratum_mining_config: {
      enable_stratum_server: false,
      stratum_server_addr: '127.0.0.1:3416',
      attempt_time_per_block: 15,
      minimum_share_difficulty: 1,
      wallet_listener_url: 'http://127.0.0.1:3415',
      burn_reward: false,
    },
    webhook_config: {
      nthreads: 4,
      timeout: 10,
    },
  },
  logging: {
    log_to_stdout: false,
    stdout_log_level: 'Warning',
    log_to_file: true,
    file_log_level: 'Info',
    log_file_path: `${app.getPath('home')}/.grin/main/grin-server.log`,
    log_file_append: true,
    log_max_size: 16777216,
    log_max_files: 32,
  },
};

const WALLET = {
  wallet: {
    chain_type: 'Mainnet',
    api_listen_interface: '127.0.0.1',
    api_listen_port: 3415,
    owner_api_listen_port: 3420,
    api_secret_path: `${app.getPath('home')}/.grin/main/.api_secret`,
    node_api_secret_path: `${app.getPath('home')}/.grin/main/.api_secret`,
    check_node_api_http_addr: 'http://127.0.0.1:3413',
    owner_api_include_foreign: true,
    data_file_dir: `${app.getPath('home')}/.grin/main/wallet_data`,
    no_commit_cache: false,
    dark_background_color_scheme: true,
    keybase_notify_ttl: 1440,
  },
  logging: {
    log_to_stdout: true,
    stdout_log_level: 'Warning',
    log_to_file: true,
    file_log_level: 'Info',
    log_file_path: `${app.getPath('home')}/.grin/main/grin-wallet.log`,
    log_file_append: true,
    log_max_size: 16777216,
    log_max_files: 32,
  },
};

export default {
  SERVER,
  WALLET,
};
