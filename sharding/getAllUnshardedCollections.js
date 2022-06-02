function getUnshardedCollections(db_name) {
  db = db.getSiblingDB(db_name);
  const all_colls = db.getCollectionNames();
  var unsharded = [];
  for (var coll of all_colls) {
    if (!db[coll].stats().sharded) {
      unsharded.push(coll);
    }
  }
  return unsharded;
}

const ignored = ["admin", "config", "local"];
const all_dbs = db.getMongo().getDBNames();

for (var db_name of all_dbs) {
  if (!ignored.includes(db_name)) {
    var unsharded = getUnshardedCollections(db_name);
    if (unsharded.length > 0) {
      for (var coll of unsharded) print(`${db_name}.${coll}`);
    }
  }
}
