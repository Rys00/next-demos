export default function ArchiveLayout({ archive, latest }) {
  return (
    <div>
      <h1>News archive</h1>
      <div id="archive-filter">{archive}</div>
      <div id="archive-latest">{latest}</div>
    </div>
  );
}
