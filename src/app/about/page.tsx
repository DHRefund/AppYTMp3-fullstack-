// Dữ liệu tĩnh
const aboutData = {
  company: "My Company",
  founded: 2024,
  features: [
    { id: 1, name: "App Router", description: "Routing mạnh mẽ với App Router" },
    { id: 2, name: "Server Components", description: "Tối ưu hiệu suất với Server Components" },
    { id: 3, name: "API Routes", description: "API Routes tích hợp sẵn" },
    { id: 4, name: "TypeScript", description: "Phát triển an toàn với TypeScript" },
  ],
  team: [
    { id: 1, name: "Nguyễn Văn A", role: "CEO" },
    { id: 2, name: "Trần Thị B", role: "CTO" },
  ],
};

// Đánh dấu trang này là static
export const dynamic = "force-static";

// Tùy chọn: Thêm revalidate nếu muốn ISR
export const revalidate = 3600; // revalidate mỗi giờ

export default function About() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Về {aboutData.company}</h1>

      <div className="prose">
        <p className="mb-4">
          Đây là trang giới thiệu về ứng dụng của chúng tôi. Được thành lập từ năm {aboutData.founded}, chúng tôi luôn
          đi đầu trong công nghệ web hiện đại.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Tính Năng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aboutData.features.map((feature) => (
            <div key={feature.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{feature.name}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Đội Ngũ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aboutData.team.map((member) => (
            <div key={member.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
