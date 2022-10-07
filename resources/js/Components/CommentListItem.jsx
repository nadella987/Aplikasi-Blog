export default function CommentListItem(props) {

return(
<div className="flex space-x-3">
<div className="flex-1 space-y-1">
  <div className="flex items-center justify-between">
    <h3 className="text-sm font-medium">{props.creatorName}</h3>
    <p className="text-sm text-gray-500">{props.timeago}</p>
  </div>
  <p className="text-sm text-gray-500 max-w-xl">
    {props.konten}
  </p>
  <div className="mt-1 flex space-x-2">
  {props.canEdit && (
  <button
 type="button"
 className="inline-flex items-center rounded border border-transparent bg-blue-100 px-4 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
 Edit
</button>
)}
{props.canDelete && (
<button
  type="button"
  className="inline-flex items-center rounded border border-transparent bg-red-100 px-4 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
>
  Hapus
</button>)}
  </div>
</div>
</div>
)
}