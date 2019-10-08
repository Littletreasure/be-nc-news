exports.formatDates = list => {
  const newList = list.map(object => {
    const newObj = { ...object };
    newObj.created_at = new Date(object.created_at);
    return newObj;
  });
  return newList;
};

exports.makeRefObj = list => {
  const refObj = {};
  list.forEach(item => {
    refObj[item.title] = item.article_id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  const newComments = [];
  comments.forEach(comment => {
    const newObj = { ...comment };
    newObj.author = comment.created_by;
    newObj.article_id = articleRef[newObj.belongs_to];
    delete newObj.created_by;
    delete newObj.belongs_to;
    newComments.push(newObj);
  });
  return newComments;
};
