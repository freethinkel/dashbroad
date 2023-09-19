// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use patch_window::patch_statusbar_window;
use tauri::{ActivationPolicy, Manager, SystemTray, SystemTrayEvent};

mod data;
mod patch_window;

use data::Rect;

fn main() {
    let tray = SystemTray::new();

    tauri::Builder::default()
        .setup(|app| {
            app.set_activation_policy(ActivationPolicy::Accessory);
            let app = app.handle();

            app.windows().iter().for_each(|(_, window)| {
                patch_statusbar_window(window.clone());
            });

            Ok(())
        })
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick { position, size, .. } => {
                if let Ok(_) = app.emit_all(
                    "on_statusbar_click",
                    Rect {
                        x: position.x,
                        y: position.y,
                        width: size.width,
                        height: size.height,
                    },
                ) {}
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
