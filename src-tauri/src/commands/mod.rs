use cocoa::base::id;
use objc::{class, msg_send, sel, sel_impl};

pub fn get_location() -> String {
    return String::from("{}{}");
}
