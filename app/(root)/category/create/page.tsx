import { CategoryForm } from '@/components/shared/category-form';

export default function CreateCategory() {
  return (
    <section>
      <div className="grid gap-6 container py-4">
        <div className="prose lg:prose-xl dark:prose-invert max-w-none">
          <h3 className="text-center sm:text-left">Create Category</h3>
        </div>

        <CategoryForm className="w-full sm:w-[450px]" />
      </div>
    </section>
  );
}
