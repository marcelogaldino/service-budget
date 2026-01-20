import { FlatList, View } from "react-native";
import { Header } from "./Header";
import { FilterInput } from "./FilterInput";
import { StatusTypes } from "@/components/Status/strategies/status-stategy";
import { BudgetCard } from "./BudgetCard";

export const Home = () => {
  const DATA = [
    {
      id: 1,
      title: "Desenvolvimento de aplicativo de loja online",
      customer: "Soluções Tecnológicas Beta",
      status: StatusTypes.ENVIADO,
      totalPrice: "22.300,00",
      services: [
        {
          title: "Design de interfaces",
          description: "Criação de wireframes e protótipos de alta fidelidade",
          price: "3.847,50",
        },
        {
          title: "Implantação e suporte",
          description: "Criação de wireframes e protótipos de alta fidelidade",
          price: "3.847,50",
        },
      ],
    },
    {
      id: 2,
      title: "Serviços de SEO",
      customer: "SEO Masters",
      status: StatusTypes.APROVADO,
      totalPrice: "3.847,50",
      services: [
        {
          title: "Design de interfaces",
          description: "Criação de wireframes e protótipos de alta fidelidade",
          price: "3.847,50",
        },
      ],
    },
    {
      id: 3,
      title: "Serviços de SEO",
      customer: "SEO Masters",
      status: StatusTypes.RASCUNHO,
      totalPrice: "3.847,50",
      services: [
        {
          title: "Design de interfaces",
          description: "Criação de wireframes e protótipos de alta fidelidade",
          price: "3.847,50",
        },
      ],
    },
    {
      id: 4,
      title: "Serviços de SEO",
      customer: "SEO Masters",
      status: StatusTypes.RECUSADO,
      totalPrice: "3.847,50",
      services: [
        {
          title: "Design de interfaces",
          description: "Criação de wireframes e protótipos de alta fidelidade",
          price: "3.847,50",
        },
      ],
    },
    {
      id: 5,
      title: "Serviços de SEO",
      customer: "SEO Masters",
      status: StatusTypes.RECUSADO,
      totalPrice: "3.847,50",
      services: [
        {
          title: "Design de interfaces",
          description: "Criação de wireframes e protótipos de alta fidelidade",
          price: "3.847,50",
        },
      ],
    },
    {
      id: 6,
      title: "Serviços de SEO",
      customer: "SEO Masters",
      status: StatusTypes.RECUSADO,
      totalPrice: "3.847,50",
      services: [
        {
          title: "Design de interfaces",
          description: "Criação de wireframes e protótipos de alta fidelidade",
          price: "3.847,50",
        },
      ],
    },
    {
      id: 7,
      title: "Serviços de SEO",
      customer: "SEO Masters",
      status: StatusTypes.RECUSADO,
      totalPrice: "3.847,50",
      services: [
        {
          title: "Design de interfaces",
          description: "Criação de wireframes e protótipos de alta fidelidade",
          price: "3.847,50",
        },
      ],
    },
    {
      id: 8,
      title: "Serviços de SEO",
      customer: "SEO Masters",
      status: StatusTypes.RECUSADO,
      totalPrice: "3.847,50",
      services: [
        {
          title: "Design de interfaces",
          description: "Criação de wireframes e protótipos de alta fidelidade",
          price: "3.847,50",
        },
      ],
    },
  ];

  return (
    <View className="bg-white flex-1 p-5">
      <Header />
      <FilterInput />

      <FlatList
        className="pt-6"
        data={DATA}
        renderItem={({ item }) => (
          <BudgetCard
            status={item.status}
            customer={item.customer}
            title={item.title}
            totalPrice={item.totalPrice}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      />
    </View>
  );
};
